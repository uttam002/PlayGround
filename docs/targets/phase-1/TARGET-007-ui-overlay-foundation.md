# TARGET-007 — UI Overlay Foundation

## Target Metadata

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **ID**       | TARGET-007                                         |
| **Phase**    | Phase 1 — World Foundation                         |
| **Priority** | 🟠 High                                            |
| **Type**     | Frontend / UI / Layout                             |
| **Estimated Effort** | 2–3 days                                 |
| **Depends On** | TARGET-001, TARGET-002, TARGET-006 (navigation events needed for island panel) |
| **Blocks**   | Nothing — this is the final Phase 1 Target         |
| **Branch**   | `feature/ui-overlay-foundation`                    |

---

## Objective

Build the HTML/React UI layer that sits on top of the Three.js canvas. This is the framework-only overlay — no portfolio content yet. No "About me", no project details. Just the structural UI shell.

**Version 1 scope (this Target):**
- ✅ Overlay layout system (positioned above canvas)
- ✅ Branding — logo text using project typeface
- ✅ Menu button (hamburger/compass icon — opens nothing yet, just renders)
- ✅ Resume button (renders, no download logic yet)
- ✅ Island selection info panel (appears when island is selected — shows island name only, no content)
- ✅ Global CSS design system (CSS variables, typography, dark theme)
- ✅ Google Fonts integrated (Cinzel, Inter)
- ❌ No audio controls yet (Phase 2)
- ❌ No navigation menu content (Phase 2)
- ❌ No resume file yet (Phase 2)
- ❌ No island content panels (Phase 2)

**Success criteria:** UI overlay and Three.js canvas coexist properly. Overlay elements are visible on top of the 3D world. Selected island name shows in panel when island is clicked.

---

## Background

The UI layer must float above the Three.js canvas using CSS `position: fixed` or an absolute overlay pattern. Three.js and React are completely separate rendering layers:

```
Browser
  └── DOM
        ├── <canvas> (Three.js world — fills 100vw x 100vh)
        └── <div> overlay (React UI — position: fixed on top)
```

The overlay must NEVER interfere with Three.js pointer events. Use `pointer-events: none` on the overlay container, then `pointer-events: auto` only on interactive elements.

**Design Tone:** Dark, cinematic, pirate-nautical. Think aged parchment, ocean depth, candlelight on maps.

---

## Design System (CSS Variables)

Establish the complete CSS design token system in this Target. All future components must use these tokens — never raw hex colors.

---

## Scope

**Primary paths:**
```
src/styles/
src/components/layout/
src/components/ui/
src/components/common/
src/features/ui-overlay/
src/app/(portfolio)/page.tsx
```

---

## Deliverables

### 1. CSS Variables — `src/styles/variables.css`

```css
/* src/styles/variables.css */
/* Core design token system — ALL color/spacing/type references come from here */

:root {
  /* ────────────────────────────────────────
     Ocean Color Palette
  ──────────────────────────────────────── */
  --ocean-depth:       #050510;    /* Deepest background */
  --ocean-dark:        #0a0a1a;    /* Dark scene bg */
  --ocean-mid:         #0a1628;    /* Ocean surface base */
  --ocean-primary:     #1a3a5c;    /* Primary ocean tone */
  --ocean-accent:      #4a7fa8;    /* Navigation lines */
  --ocean-highlight:   #7ecfff;    /* Hover state */
  --ocean-foam:        #b8d4e8;    /* Light ocean foam */

  /* ────────────────────────────────────────
     Moonlight & Atmosphere
  ──────────────────────────────────────── */
  --moon-glow:         #c8d8e8;    /* Moonlight color */
  --fog-color:         #0d1b2a;    /* Fog atmosphere */
  --star-color:        #e8f0ff;    /* Stars/sparkles */

  /* ────────────────────────────────────────
     Gold & Treasure
  ──────────────────────────────────────── */
  --gold-primary:      #d4a017;    /* Primary gold */
  --gold-bright:       #ffcc44;    /* Active/selected gold */
  --gold-muted:        #9a7a20;    /* Muted gold */
  --gold-dark:         #4a3a10;    /* Dark gold shadow */

  /* ────────────────────────────────────────
     Parchment & Wood
  ──────────────────────────────────────── */
  --parchment-light:   #f0e8d0;    /* Light parchment */
  --parchment:         #d4c9a8;    /* Base parchment */
  --parchment-dark:    #a89870;    /* Dark parchment */
  --wood-light:        #8b5e3c;    /* Light wood */
  --wood-dark:         #3d2b1f;    /* Dark wood */

  /* ────────────────────────────────────────
     Text
  ──────────────────────────────────────── */
  --text-primary:      #e8e0d0;    /* Main text */
  --text-secondary:    #a8a090;    /* Secondary text */
  --text-muted:        #6a6560;    /* Muted text */
  --text-accent:       #c8d8e8;    /* Moon-toned accent text */
  --text-gold:         #d4a017;    /* Gold text */
  --text-on-dark:      #f0e8d0;    /* Text on dark backgrounds */

  /* ────────────────────────────────────────
     UI Surfaces (Glass / Panel)
  ──────────────────────────────────────── */
  --surface-dark:      rgba(5, 8, 18, 0.85);
  --surface-mid:       rgba(10, 20, 40, 0.75);
  --surface-glass:     rgba(20, 35, 60, 0.60);
  --surface-border:    rgba(100, 150, 200, 0.15);
  --surface-hover:     rgba(30, 55, 90, 0.80);

  /* ────────────────────────────────────────
     Spacing Scale
  ──────────────────────────────────────── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* ────────────────────────────────────────
     Border Radius
  ──────────────────────────────────────── */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  12px;
  --radius-xl:  16px;
  --radius-full: 9999px;

  /* ────────────────────────────────────────
     Typography
  ──────────────────────────────────────── */
  --font-display:  var(--font-cinzel), 'Cinzel', serif;
  --font-body:     var(--font-inter), 'Inter', sans-serif;

  --text-xs:   0.75rem;    /* 12px */
  --text-sm:   0.875rem;   /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg:   1.125rem;   /* 18px */
  --text-xl:   1.25rem;    /* 20px */
  --text-2xl:  1.5rem;     /* 24px */
  --text-3xl:  1.875rem;   /* 30px */
  --text-4xl:  2.25rem;    /* 36px */

  /* ────────────────────────────────────────
     Z-Index Layers
  ──────────────────────────────────────── */
  --z-canvas:   0;
  --z-overlay:  10;
  --z-panel:    20;
  --z-modal:    30;
  --z-toast:    40;
  --z-debug:    100;

  /* ────────────────────────────────────────
     Transitions
  ──────────────────────────────────────── */
  --transition-fast:    150ms ease;
  --transition-normal:  300ms ease;
  --transition-slow:    500ms ease;
}
```

---

### 2. Typography — `src/styles/typography.css`

```css
/* src/styles/typography.css */

.font-display {
  font-family: var(--font-display);
}

.font-body {
  font-family: var(--font-body);
}

.text-heading-1 {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  line-height: 1.2;
}

.text-heading-2 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--text-primary);
  line-height: 1.3;
}

.text-label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.text-body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--text-primary);
  line-height: 1.6;
}

.text-caption {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--text-muted);
}
```

---

### 3. Global Styles — `src/styles/globals.css`

Update (or replace existing) with:

```css
/* src/styles/globals.css */
@import './variables.css';
@import './typography.css';

/* Import Google Fonts — Tailwind will handle via next/font, but this is a fallback */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

/* Tailwind base */
@tailwind base;
@tailwind components;
@tailwind utilities;

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--ocean-depth);
  color: var(--text-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar styling for panels */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--ocean-accent);
  border-radius: var(--radius-full);
}

/* Remove default button styles */
button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

/* Selection color */
::selection {
  background: var(--ocean-accent);
  color: var(--text-on-dark);
}
```

---

### 4. World Overlay Layout — `src/components/layout/world-overlay.tsx`

**Purpose:** The parent overlay container. Sits above the Three.js canvas using `position: fixed`. Has `pointer-events: none` so mouse events pass through to the canvas by default.

```typescript
// src/components/layout/world-overlay.tsx
// The HTML layer above Three.js. Pointer events disabled by default — enable per element.

import type { ReactNode } from 'react';

type WorldOverlayProps = {
  children: ReactNode;
};

export function WorldOverlay({ children }: WorldOverlayProps) {
  return (
    <div
      id="world-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-overlay)',
        pointerEvents: 'none', // Pass mouse events to Three.js by default
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}
```

---

### 5. World Logo — `src/components/common/world-logo.tsx`

**Purpose:** Displays the project name in Cinzel font — top-left branding.

```typescript
// src/components/common/world-logo.tsx
'use client';

export function WorldLogo() {
  return (
    <div
      id="world-logo"
      style={{
        pointerEvents: 'auto', // Re-enable pointer events for this element
        padding: 'var(--space-6)',
      }}
    >
      <h1
        className="font-display"
        style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          color: 'var(--gold-primary)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textShadow: '0 0 20px rgba(212, 160, 23, 0.3)',
          lineHeight: 1,
        }}
      >
        The Developer's Voyage
      </h1>
      <p
        className="text-label"
        style={{
          marginTop: 'var(--space-1)',
          color: 'var(--text-secondary)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.15em',
        }}
      >
        A Portfolio Experience
      </p>
    </div>
  );
}
```

---

### 6. Overlay Controls — `src/components/common/overlay-controls.tsx`

**Purpose:** Top-right UI controls — menu button and resume button.

```typescript
// src/components/common/overlay-controls.tsx
'use client';

type OverlayControlsProps = {
  onMenuClick?: () => void;
  onResumeClick?: () => void;
};

const BUTTON_STYLE: React.CSSProperties = {
  pointerEvents: 'auto',
  background: 'var(--surface-glass)',
  border: '1px solid var(--surface-border)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-accent)',
  padding: 'var(--space-2) var(--space-4)',
  fontSize: 'var(--text-sm)',
  fontFamily: 'var(--font-body)',
  fontWeight: 500,
  letterSpacing: '0.05em',
  cursor: 'pointer',
  backdropFilter: 'blur(8px)',
  transition: 'background var(--transition-fast), border-color var(--transition-fast)',
};

export function OverlayControls({ onMenuClick, onResumeClick }: OverlayControlsProps) {
  return (
    <div
      id="overlay-controls"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-6)',
      }}
    >
      <button
        id="btn-resume"
        style={BUTTON_STYLE}
        onClick={onResumeClick}
        aria-label="Download resume"
      >
        Resume
      </button>
      <button
        id="btn-menu"
        style={BUTTON_STYLE}
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        ☰ Menu
      </button>
    </div>
  );
}
```

---

### 7. Island Info Panel — `src/features/ui-overlay/island-info-panel.tsx`

**Purpose:** Bottom-center panel that appears when an island is selected. Phase 1 shows island name only — Phase 2 adds full content.

```typescript
// src/features/ui-overlay/island-info-panel.tsx
'use client';

import { useNavigationStore } from '@/store/navigation.store';
import { ISLAND_DEFINITIONS } from '@/constants/island.constants';

export function IslandInfoPanel() {
  const selectedIslandId = useNavigationStore((s) => s.selectedIslandId);
  const clearSelection = useNavigationStore((s) => s.clearSelection);

  const selectedIsland = ISLAND_DEFINITIONS.find(
    (island) => island.id === selectedIslandId
  );

  if (!selectedIsland) return null;

  return (
    <div
      id="island-info-panel"
      style={{
        pointerEvents: 'auto',
        position: 'absolute',
        bottom: 'var(--space-8)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--surface-dark)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6) var(--space-8)',
        backdropFilter: 'blur(12px)',
        minWidth: '280px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Island label */}
      <p
        className="text-label"
        style={{
          color: 'var(--gold-muted)',
          marginBottom: 'var(--space-1)',
        }}
      >
        Destination
      </p>

      {/* Island name */}
      <h2
        className="font-display"
        style={{
          fontSize: 'var(--text-xl)',
          color: 'var(--gold-primary)',
          letterSpacing: '0.08em',
          marginBottom: 'var(--space-4)',
        }}
      >
        {selectedIsland.label}
      </h2>

      {/* Island type badge */}
      <span
        style={{
          display: 'inline-block',
          background: 'var(--ocean-primary)',
          color: 'var(--ocean-highlight)',
          padding: 'var(--space-1) var(--space-3)',
          borderRadius: 'var(--radius-full)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-4)',
        }}
      >
        {selectedIsland.type}
      </span>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-3)',
          marginTop: 'var(--space-2)',
        }}
      >
        <button
          id="btn-explore-island"
          style={{
            background: 'var(--gold-primary)',
            color: '#050510',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2) var(--space-6)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            cursor: 'pointer',
          }}
          aria-label={`Explore ${selectedIsland.label}`}
        >
          Explore Island
        </button>
        <button
          id="btn-close-panel"
          style={{
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-2) var(--space-4)',
            fontSize: 'var(--text-sm)',
            cursor: 'pointer',
          }}
          onClick={clearSelection}
          aria-label="Close island panel"
        >
          Close
        </button>
      </div>
    </div>
  );
}
```

---

### 8. UI Overlay Feature — `src/features/ui-overlay/ui-overlay.tsx`

**Purpose:** The complete overlay composition. Assembles all overlay components in the correct positions.

```typescript
// src/features/ui-overlay/ui-overlay.tsx
'use client';

import { WorldOverlay } from '@/components/layout/world-overlay';
import { WorldLogo } from '@/components/common/world-logo';
import { OverlayControls } from '@/components/common/overlay-controls';
import { IslandInfoPanel } from './island-info-panel';

export function UiOverlay() {
  return (
    <WorldOverlay>
      {/* Top bar: Logo (left) + Controls (right) */}
      <div
        id="overlay-top-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <WorldLogo />
        <OverlayControls
          onMenuClick={() => {
            // Phase 2: open navigation menu
            console.log('Menu clicked — Phase 2 feature');
          }}
          onResumeClick={() => {
            // Phase 2: download resume
            console.log('Resume clicked — Phase 2 feature');
          }}
        />
      </div>

      {/* Spacer — fills remaining height so panel anchors to bottom */}
      <div style={{ flex: 1, position: 'relative' }}>
        {/* Island selection panel */}
        <IslandInfoPanel />
      </div>
    </WorldOverlay>
  );
}
```

---

### 9. Mount UI Overlay on Portfolio Page

Update `src/app/(portfolio)/page.tsx`:

```typescript
// src/app/(portfolio)/page.tsx
import { WorldScene } from '@/features/world/world-scene';
import { UiOverlay } from '@/features/ui-overlay/ui-overlay';

export default function PortfolioPage() {
  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Three.js 3D World — fills 100% */}
      <WorldScene />

      {/* React HTML UI — floats above canvas */}
      <UiOverlay />
    </main>
  );
}
```

---

### 10. Barrel Exports

```typescript
// src/components/layout/index.ts
export { WorldOverlay } from './world-overlay';

// src/components/common/index.ts
export { WorldLogo } from './world-logo';
export { OverlayControls } from './overlay-controls';

// src/features/ui-overlay/index.ts
export { UiOverlay } from './ui-overlay';
export { IslandInfoPanel } from './island-info-panel';
```

---

## Overlay Layout Diagram

```
┌─────────────────────────────────────────────────────────┐
│  The Developer's Voyage          [Resume]  [☰ Menu]     │  ← Top bar (pointer-events: auto)
│                                                          │
│                                                          │
│              [Three.js Canvas fills here]               │  ← pointer-events: none (overlay)
│                                                          │
│                    ┌───────────────────┐                 │
│                    │   Destination     │                 │  ← IslandInfoPanel (pointer-events: auto)
│                    │  🏝 Skills Island  │                 │
│                    │  [Explore] [Close]│                 │
│                    └───────────────────┘                 │
└─────────────────────────────────────────────────────────┘
```

---

## Files to Create / Modify

| Action   | File                                                      |
|----------|-----------------------------------------------------------|
| CREATE   | `src/styles/variables.css`                                |
| CREATE   | `src/styles/typography.css`                               |
| MODIFY   | `src/styles/globals.css`                                  |
| CREATE   | `src/components/layout/world-overlay.tsx`                 |
| CREATE   | `src/components/layout/index.ts`                          |
| CREATE   | `src/components/common/world-logo.tsx`                    |
| CREATE   | `src/components/common/overlay-controls.tsx`              |
| CREATE   | `src/components/common/index.ts`                          |
| CREATE   | `src/features/ui-overlay/ui-overlay.tsx`                  |
| CREATE   | `src/features/ui-overlay/island-info-panel.tsx`           |
| CREATE   | `src/features/ui-overlay/index.ts`                        |
| MODIFY   | `src/app/(portfolio)/page.tsx` (mount UiOverlay)          |
| MODIFY   | `src/app/layout.tsx` (import globals.css)                 |

---

## Engineering Rules to Enforce

- ❌ No inline hex colors anywhere in components — only CSS variable references (`var(--ocean-primary)`)
- ❌ No magic spacing values — only CSS variable references (`var(--space-4)`)
- ❌ No `pointer-events: auto` on the overlay container itself — only on interactive children
- ❌ No portfolio content in this overlay (no "About me", no resume content, no project details)
- ✅ All element IDs must be unique and descriptive (for browser testing)
- ✅ All interactive elements must have `aria-label`
- ✅ Logo `<h1>` is the only h1 on the page — proper heading hierarchy
- ✅ Overlay uses CSS variables exclusively for theming

---

## Accessibility Requirements

- [ ] Logo heading uses `<h1>` semantic tag
- [ ] All buttons have `aria-label` attributes
- [ ] Focus styles are visible (not just `:hover`)
- [ ] Color contrast meets WCAG AA minimum

---

## Acceptance Criteria

- [ ] Three.js canvas renders behind the UI overlay without visual interference
- [ ] Logo is visible top-left in Cinzel font with gold color
- [ ] Menu and Resume buttons visible top-right
- [ ] Clicking an island in 3D triggers the island info panel to appear bottom-center
- [ ] Panel shows the island name and type correctly
- [ ] Close button dismisses panel (clears `selectedIslandId` in store)
- [ ] Mouse events pass through to Three.js canvas except on interactive buttons/panel
- [ ] No layout shift when panel appears/disappears
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] `pnpm dev` shows full working overlay + 3D world

---

## Definition of Done

- [ ] All files created and committed
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm lint` passes
- [ ] Dev mode shows: logo + buttons on top, 3D world underneath, island panel on selection
- [ ] All CSS variables are correctly applied (verify in browser DevTools computed styles)
- [ ] PR includes screenshot showing full overlay with island panel open
