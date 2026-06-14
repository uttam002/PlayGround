# File Roles & Ownership Reference Guide

This document defines the purpose, ownership, and maintenance guidelines for each individual file in **The Developer's Voyage** project. It serves as a developer-facing reference to understand **why** files were created, **what** they own, and **how** they must be modified, extended, and maintained.

---

## Golden Rules of File Maintenance

1. **Strict File Responsibility Boundary**: Every file has exactly one clear domain. If a change requires updating business logic, UI, and visual representation all in one file, you are violating folder/file boundaries.
2. **Read-Only / Constant Separation**: Runtime parameters (`config/`) must not be mixed with static, compile-time constants (`constants/`).
3. **No Magic Values**: Never write hardcoded numbers, strings, colors, or physics parameters directly in page elements or WebGL components. They belong inside `constants/` or `config/`.
4. **Export Cleanliness**: Non-page files must use named exports. Never use default exports except for Next.js App Router files (`page.tsx`, `layout.tsx`, etc.).
5. **Constants Must Be Grouped**: Do not write flat exports like `export const FOV = 60`. Always group constants into domain-specific, frozen objects (e.g. `export const CAMERA = { FOV: 60 } as const`).

---

## 1. Project Configuration Files

These files configure the build tooling, compiler behaviors, and dependencies of the monorepo.

### [next.config.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/next.config.ts)
* **Why Created**: Sets up Next.js compilation, builds, image optimization, and compiler flags.
* **What It Handles**:
  - React 19 Compiler configuration (`reactCompiler: true`).
* **Maintenance & Extension**:
  - Keep plugins or headers here.
  - **What NOT to do**: Do not add application-level runtime configurations or environment variables directly here. Use `src/config/app.config.ts` instead.

### [tsconfig.json](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/tsconfig.json)
* **Why Created**: Configures the TypeScript compiler rules and module resolution paths.
* **What It Handles**:
  - Enforces strict type checking.
  - Sets up path aliases (`@/*` pointing to `src/*`).
* **Maintenance & Extension**:
  - Do not relax rules unless absolutely necessary.
  - **What NOT to do**: Do not add manual import path mappings that deviate from the `@/` convention.

### [package.json](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/package.json)
* **Why Created**: Defines project metadata, build/dev scripts, and third-party dependencies.
* **What It Handles**:
  - Scripts: `dev`, `build`, `start`, `lint`, `typecheck`.
  - Version constraints for core dependencies (React 19, Next.js 15, Three.js, Zustand, GSAP).
* **Maintenance & Extension**:
  - Use `pnpm` inside the frontend directory to update or install packages.
  - Keep `dependencies` restricted to pure client-side/styling tools. Put database/prisma dependencies strictly in the backend package.

### [components.json](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/components.json)
* **Why Created**: Configuration file for the `shadcn/ui` CLI.
* **What It Handles**:
  - Specifies where new shadcn components will be placed (`src/components/ui/`).
  - Defines the alias paths and base CSS file (`src/styles/globals.css`).
* **Maintenance & Extension**:
  - Do not modify manually. It is automatically read by the command `npx shadcn@latest add <component>`.

---

## 2. App Router Layer (`src/app/`)

This directory owns the Next.js routing schema, layout wrappers, and root entry points. It contains NO business logic.

### [layout.tsx](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/app/layout.tsx)
* **Why Created**: Serves as the primary HTML wrapper for the entire application.
* **What It Handles**:
  - Font loading: Imports **Cinzel** and **Inter** fonts from `next/font/google` and configures their CSS variables (`--font-cinzel`, `--font-inter`).
  - Injecting SEO Metadata (title, description, open graph tags) via the exported `metadata` object.
  - Loading global styling (`import './globals.css'`).
* **Maintenance & Extension**:
  - Add site-wide provider wrappers here (e.g. query client providers, theme providers).
  - Update site-wide SEO keywords and tags here.
  - **What NOT to do**: Never write inline component styles, WebGL loaders, or interactive menus in this file. It is the static shell.

### [page.tsx](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/app/page.tsx)
* **Why Created**: The root route endpoint (`/`) of the application.
* **What It Handles**:
  - Mounts the primary 3D World view.
  - Currently serves a stylized dark placeholder screen ("Setting sail...") for Phase 1.
* **Maintenance & Extension**:
  - When mounting the Three.js Canvas layer, replace the placeholder with the `<WorldScene />` component from `features/world`.
  - **What NOT to do**: Do not write Three.js scene elements, Canvas setups, or state management hooks inside this page. Keep the file simple and declarative.

---

## 3. Configuration Layer (`src/config/`)

This folder manages runtime settings. It is the **only** place in the source folder permitted to read `process.env`.

### [app.config.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/config/app.config.ts)
* **Why Created**: Exposes general application and environment metadata.
* **What It Handles**:
  - Env reads: `NEXT_PUBLIC_APP_URL`.
  - Booleans: `isDevelopment` (checks if `NODE_ENV === 'development'`), `isProduction`.
* **Maintenance & Extension**:
  - Add environment checking values or backend URL configurations here.
  - **What NOT to do**: Never read `process.env` in any other file. Import `AppConfig` from this file instead to ensure unified access control.

### [world.config.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/config/world.config.ts)
* **Why Created**: Manages runtime engine properties and flags for the 3D scene.
* **What It Handles**:
  - Performance flags: shadow toggles, fog toggles, physics debug indicators.
  - Framerate target configurations.
* **Maintenance & Extension**:
  - When debugging performance or shadow issues, toggle flags here.
  - Add quality profile options (e.g., Low, Medium, High graphics settings) here.

### [navigation.config.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/config/navigation.config.ts)
* **Why Created**: Governs user-interaction timings and routing settings.
* **What It Handles**:
  - Travel animation parameters (e.g. `enableTravelAnimation`).
  - Interaction delay buffers (e.g. `hoverDebounceMs`).
* **Maintenance & Extension**:
  - Adjust timing profiles here if the user UI feels too sluggish or jumpy.

---

## 4. Constants Layer (`src/constants/`)

Constants are strictly static, compile-time properties. They must never rely on environment variables, APIs, or runtime execution.

### [world.constants.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/constants/world.constants.ts)
* **Why Created**: Holds static parameters defining the physical 3D environment.
* **What It Handles**:
  - `WORLD.OCEAN_SIZE` (boundaries of the sea grid).
  - `WORLD.FOG_COLOR` and density controls.
  - Ambient environmental variables.
* **Maintenance & Extension**:
  - Modify parameters here to change the physical scale or color tone of the ocean.

### [camera.constants.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/constants/camera.constants.ts)
* **Why Created**: Defines camera positions, viewing properties, and target nodes for each mode.
* **What It Handles**:
  - `CAMERA.FOV` (field of view).
  - Vector coordinates (`x`, `y`, `z`) for camera modes: `CINEMATIC`, `EXPLORATION`, `RETURN`.
  - Focus configurations per island.
* **Maintenance & Extension**:
  - When adjusting cinematic angles or camera focus points, update the coordinates in this file.
  - **What NOT to do**: Avoid dynamically recalculating camera targets here; these vectors must be plain, readable coordinate constants.

### [animation.constants.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/constants/animation.constants.ts)
* **Why Created**: Standardizes duration rates and ease curves for GSAP and Framer Motion.
* **What It Handles**:
  - `ANIMATION.DURATION` (Fast, Normal, Slow, Cinematic transition times in milliseconds/seconds).
  - `ANIMATION.EASE` (standard cubic-bezier strings and GSAP easing definitions).
* **Maintenance & Extension**:
  - Define custom ease curves here to maintain styling consistency across UI components and 3D camera sweeps.

### [island.constants.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/constants/island.constants.ts)
* **Why Created**: Data registry containing structural details for every interactive island.
* **What It Handles**:
  - `ISLAND_DEFINITIONS`: Readonly array of islands with keys, IDs, display titles, categories, and exact positions.
  - `ISLAND_GEOMETRY`: Outer scales, collision radius limits.
  - `ISLAND_INTERACTION`: Mouse hover triggers and active scale metrics.
* **Maintenance & Extension**:
  - When adding a new island to the narrative, add its definition object here.
  - **What NOT to do**: Do not place HTML layouts or React Component trees inside this file. It must remain a clean data mapping.

### [ship.constants.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/constants/ship.constants.ts)
* **Why Created**: Stores visual configurations for the player's 3D ship.
* **What It Handles**:
  - Default spawn coordinates.
  - Wave bobbing thresholds (`FLOAT.AMPLITUDE`, `FLOAT.SPEED`).
  - Rocking rotation limits.
* **Maintenance & Extension**:
  - Tweak wave physics behaviors (speed/amplitude) to make the ship feel heavier or lighter in the water.

### [navigation.constants.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/constants/navigation.constants.ts)
* **Why Created**: Holds visual properties for the sea routes linking the islands.
* **What It Handles**:
  - Line stroke styling: base colors, active highlighting colors, and opacity rules.
  - Node connection definitions (mapping which islands are connected by travel pathways).
* **Maintenance & Extension**:
  - Change colors or opacity parameters here to align routes with the color palette.

---

## 5. TypeScript Types Layer (`src/types/`)

These files compile down to nothing. They contain pure TypeScript types, interfaces, or type guard helpers.

### [world.types.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/types/world.types.ts)
* **Why Created**: Defines states and states metrics of the virtual environment.
* **What It Handles**:
  - `WorldLoadingStatus` ('idle' | 'loading' | 'ready' | 'error').
  - `WorldState` layout interface.

### [island.types.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/types/island.types.ts)
* **Why Created**: Types the data structures representing the interactive islands.
* **What It Handles**:
  - `IslandType` categories ('home' | 'skills' | 'projects' | 'about' | 'contact').
  - Structure interfaces for `IslandDefinition` and `IslandPosition`.

### [navigation.types.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/types/navigation.types.ts)
* **Why Created**: Declares types for routes, interactive event targets, and navigation records.
* **What It Handles**:
  - `NavigationRoute` connection lines structure.
  - Event schemas for clicks or selections.

### [camera.types.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/types/camera.types.ts)
* **Why Created**: Handles typing camera tracking profiles.
* **What It Handles**:
  - `CameraMode` ('cinematic' | 'exploration' | 'focus' | 'return').
  - Vector coordinate wrappers for R3F integration.

---

## 6. State Management Layer (`src/store/`)

These stores contain application state, reactive actions, and selectors built with Zustand. They are the single source of truth for the client app.

### [world.store.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/store/world.store.ts)
* **Why Created**: Manages lifecycle operations of the overall WebGL scene.
* **What It Handles**:
  - Tracks assets preload progress.
  - Handles page entrance animations when assets complete loading.
* **Maintenance & Extension**:
  - Add hooks to monitor when individual heavy GLB model assets finish downloading.

### [camera.store.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/store/camera.store.ts)
* **Why Created**: Manages state of the active camera and tracks current viewing coordinates.
* **What It Handles**:
  - Tracks the camera mode (`mode`).
  - Flag tracking transition states (`isTransitioning`).
  - Active focal node id (`focusTargetId`).
* **Maintenance & Extension**:
  - Call mutations from components or UI menus to transition the viewport between cinematic sweeps or detailed island inspections.

### [navigation.store.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/store/navigation.store.ts)
* **Why Created**: Manages what the user is inspecting and the paths highlighted.
* **What It Handles**:
  - Selected island index ID (`selectedIslandId`).
  - Hovered island tracking (`hoveredIslandId`).
  - Coordinates tracking the ship hub.
* **Maintenance & Extension**:
  - Bind interactions to trigger route highlighting or show popup info card details.
  - **What NOT to do**: Do not trigger DOM operations or direct Canvas state updates inside store actions. Keep action logic focused on modifying store values.

---

## 7. Styling Layer (`src/styles/`)

This folder manages global stylesheets and CSS custom properties (variables) that outline the visual system.

### [variables.css](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/styles/variables.css)
* **Why Created**: Sets up the design tokens (colors, font definitions, sizes).
* **What It Handles**:
  - Harmonious ocean color scheme variables (HSL format) for CSS & Tailwind integration.
  - Font family bindings for Cinzel (`--font-display`) and Inter (`--font-body`).
* **Maintenance & Extension**:
  - Change colors or modify brand theme tokens in this file to update the layout appearance application-wide.

### [theme.css](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/styles/theme.css)
* **Why Created**: Defines high-level background themes and layout structures.
* **What It Handles**:
  - Body rules (scroll suppression, background colors, font smoothing).
  - Selection highlights and scrollbar styling.
* **Maintenance & Extension**:
  - Tweak scrollbar appearance or body defaults here.

### [animations.css](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/styles/animations.css)
* **Why Created**: Stores global CSS keyframes and utilities.
* **What It Handles**:
  - Shimmer effects, overlay fades, and micro-interaction utilities.
* **Maintenance & Extension**:
  - Put reusable CSS classes for standard keyframe animations here.

### [globals.css](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/styles/globals.css)
* **Why Created**: Combines all styles and registers Tailwind commands.
* **What It Handles**:
  - Imports Tailwind core layers.
  - Combines `variables.css`, `theme.css`, and `animations.css` in a single stylesheet.
* **Maintenance & Extension**:
  - Keep this file clean; it should only list imports. Add specific rule sets to their respective files instead of piling code here.

---

## 8. Shared UI & Utilities (`src/components/`, `src/lib/`)

### [utils.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/lib/utils.ts)
* **Why Created**: Shared feature-agnostic helper functions.
* **What It Handles**:
  - Class name merging utilities (`cn`).
* **Maintenance & Extension**:
  - **What NOT to do**: Do not add business-specific calculation methods or Three.js functions here. This is strictly reserved for clean, utility-level helpers.

### [button.tsx](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-frontend/src/components/ui/button.tsx)
* **Why Created**: A reusable shadcn/ui primitive component.
* **What It Handles**:
  - Stylized interactive buttons with support for custom sizes, outline variants, and loading states.
* **Maintenance & Extension**:
  - Customize standard layout properties or styles inside variant parameters.

---

## 9. Monorepo Backend Layer (`pirate-ocean-portfolio-backend/`)

This directory houses the Node.js / Express services, database connection drivers, and backend route logic.

### [index.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-backend/src/index.ts)
* **Why Created**: Startup entry point for the backend Node.js process.
* **What It Handles**:
  - Reads configuration, boots up the Express instance, and listens on the specified port.
* **Maintenance & Extension**:
  - Keep startup logging or initialization procedures here.

### [server.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-backend/src/server.ts)
* **Why Created**: Factory setup for configuring the Express application middleware.
* **What It Handles**:
  - Configures CORS origins.
  - Adds JSON parse handling.
  - Registers health routes (`/health`) and main sub-routers (`/api`).
* **Maintenance & Extension**:
  - Put new global server middleware (e.g. rate-limiters, logger middleware) here.

### [config/env.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-backend/src/config/env.ts)
* **Why Created**: Validates and typechecks backend environment variables on startup.
* **What It Handles**:
  - Enforces checks on `PORT`, `CORS_ORIGIN`, `DATABASE_URL`, and JWT credentials using Zod schemas.
* **Maintenance & Extension**:
  - Add properties to the schema when adding new API integration variables (e.g. email SMTP credentials).

### [routes/index.ts](file:///f:/A%20(vs%20code)/PlayGround/pirate-ocean-portfolio-backend/src/routes/index.ts)
* **Why Created**: Master router orchestrating incoming REST calls.
* **What It Handles**:
  - Registers sub-routers for specific services (such as authentication or contact form logic).
* **Maintenance & Extension**:
  - Import and register new resource routing scripts here.
