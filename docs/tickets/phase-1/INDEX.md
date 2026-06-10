# Phase 1 — Task Tickets Index

## Overview

These 7 tickets cover the complete implementation of **Phase 1: World Foundation & Asset Preparation** for The Developer's Voyage portfolio project.

Phase 1 Goal: Build the technical foundation — a working 3D world with ocean, ship, islands, camera system, navigation, and a UI overlay. **No portfolio content.** The world must exist before content can live in it.

---

## Ticket Dependency Map

```
TICKET-001  ← Start here (no dependencies)
Folder Architecture Setup
    │
    ├──► TICKET-002  ← Three.js Canvas & Scene Foundation
    │         │
    │         ├──► TICKET-003  ← Ocean Prototype
    │         │         │
    │         │         └──► TICKET-005  ← Ship & Island Prototypes
    │         │                     │
    │         └──► TICKET-004  ←────┤         TICKET-006  ← Navigation Routes
    │         Camera System         │               │
    │                               └──────────────►│
    │                                               │
    └──────────────────────────────────────────────►▼
                                              TICKET-007
                                           UI Overlay Foundation
```

**Sequential order:** 001 → 002 → 003 → 004 → 005 → 006 → 007

TICKET-003 and TICKET-004 can be worked on in parallel after TICKET-002 is complete.

---

## Ticket Summary Table

| Ticket | Name | Priority | Effort | Depends On | Branch |
|--------|------|----------|--------|------------|--------|
| [TICKET-001](./TICKET-001-folder-architecture-setup.md) | Folder Architecture & Project Foundation | 🔴 Critical | 1–2 days | — | `feature/folder-architecture-setup` |
| [TICKET-002](./TICKET-002-threejs-canvas-scene-foundation.md) | Three.js Canvas & Scene Foundation | 🔴 Critical | 2–3 days | 001 | `feature/threejs-canvas-scene-foundation` |
| [TICKET-003](./TICKET-003-ocean-prototype.md) | Ocean Prototype | 🔴 Critical | 2–3 days | 001, 002 | `feature/ocean-prototype` |
| [TICKET-004](./TICKET-004-camera-system.md) | Camera System | 🔴 Critical | 2–3 days | 001, 002 | `feature/camera-system` |
| [TICKET-005](./TICKET-005-ship-and-island-prototypes.md) | Ship & Island Prototypes | 🟠 High | 3–4 days | 001, 002, 003 | `feature/ship-island-prototypes` |
| [TICKET-006](./TICKET-006-navigation-routes-island-selection.md) | Navigation Routes & Island Selection | 🟠 High | 2–3 days | 001, 004, 005 | `feature/navigation-routes-island-selection` |
| [TICKET-007](./TICKET-007-ui-overlay-foundation.md) | UI Overlay Foundation | 🟠 High | 2–3 days | 001, 002, 006 | `feature/ui-overlay-foundation` |

**Total Estimated Effort:** 14–21 days (solo) / 10–14 days (2 devs, parallel work)

---

## Phase 1 Completion Checklist

Use this to track overall phase progress.

### TICKET-001 — Folder Architecture
- [ ] All folders created in `src/`
- [ ] Store placeholder files created
- [ ] Type definition files created
- [ ] Constants files created
- [ ] Config files created
- [ ] Root layout with fonts and SEO metadata

### TICKET-002 — Three.js Canvas
- [ ] `WorldCanvas` renders without errors
- [ ] Dynamic import (no SSR) working
- [ ] Atmospheric lighting visible (moonlight + ambient)
- [ ] Fog creates depth
- [ ] `Stats` FPS overlay shows in dev mode
- [ ] World store `isWorldLoaded` updates correctly

### TICKET-003 — Ocean Prototype
- [ ] Ocean plane visible and animated
- [ ] Wave movement smooth and organic
- [ ] Moonlight reflection visible on water surface
- [ ] Ocean material is singleton (not recreated)
- [ ] 60 FPS maintained on desktop
- [ ] Unit tests for wave calculation pass

### TICKET-004 — Camera System
- [ ] Camera starts in `cinematic` mode
- [ ] GSAP transition from `cinematic` → `exploration` works
- [ ] `isTransitioning` state correct during/after animation
- [ ] Camera debug panel works in dev, hidden in production
- [ ] No camera manipulation outside `src/three/cameras/`

### TICKET-005 — Ship & Island Prototypes
- [ ] Ship visible at world center with floating animation
- [ ] All islands from `ISLAND_DEFINITIONS` render at correct positions
- [ ] Island system is data-driven (1 generic component)
- [ ] Palm trees visible on each island
- [ ] 60 FPS with full scene

### TICKET-006 — Navigation Routes
- [ ] Route lines visible from ship hub to all islands
- [ ] Island hover highlights corresponding route
- [ ] Island click updates navigation store (`selectedIslandId`)
- [ ] Cursor changes on hover/leave
- [ ] No direct UI manipulation from Three.js event handlers

### TICKET-007 — UI Overlay
- [ ] Logo visible top-left in Cinzel font
- [ ] Menu + Resume buttons visible top-right
- [ ] Island info panel appears on island selection
- [ ] Panel shows correct island name/type
- [ ] Close button dismisses panel
- [ ] Mouse events pass through to Three.js correctly
- [ ] CSS variables system complete
- [ ] No inline hex colors in any component

---

## Phase 1 Final Result Verification

At the end of all 7 tickets, the following must be true:

```
✓ Dark cinematic ocean fills the screen
✓ Moonlight reflects on animated waves
✓ Ship prototype floats at world center with idle animation
✓ Multiple islands scattered at world positions with palm trees
✓ Dashed route lines connect ship hub to each island
✓ Hovering an island highlights its route line
✓ Clicking an island shows selection panel (island name)
✓ Camera transitions smoothly between Cinematic and Exploration modes
✓ UI overlay (logo, menu, resume) floats above the 3D world
✓ 60 FPS on desktop maintained
✓ Zero TypeScript errors
✓ Zero ESLint errors
✓ All systems are data-driven (no hardcoded island/route/camera values)
```

---

## Key Architecture Rules (Reference)

These rules apply across ALL tickets. Any violation must be caught in code review.

| Rule | Details |
|------|---------|
| **No Magic Values** | All numbers/colors in constants files. No inline values. |
| **No `any` Types** | TypeScript strict mode. All types explicit. |
| **Data-Driven World** | Islands, routes, camera configs all from constants/config — never hardcoded. |
| **Three.js Separation** | Three.js owns visuals. React owns content. Never mixed. |
| **Event-Driven Interactions** | 3D events emit to store. React responds. 3D never directly controls UI. |
| **Singleton Materials** | Materials created once, shared. Never recreated per-render. |
| **Loader Pattern** | All model loading via `src/three/loaders/` — never `useGLTF()` directly in object components. |
| **Camera Centralized** | All camera logic in `src/three/cameras/`. Never in random components. |
| **Pointer Events** | Overlay container `pointer-events: none`. Re-enable only on interactive children. |
| **No Default Exports** | Named exports only. Exception: Next.js pages which require default exports. |

---

## Files Not In Phase 1 Scope (Do Not Implement)

| Feature | Phase |
|---------|-------|
| About page content | Phase 2 |
| Skills page content | Phase 2 |
| Experience timeline | Phase 2 |
| Project details | Phase 2 |
| Contact form | Phase 2 |
| AI Navigator assistant | Phase 2+ |
| Audio system | Phase 2 |
| Day/Night cycle | Phase 2+ |
| Weather system | Phase 2+ |
| Ship travel animation | Phase 2 |
| Resume download | Phase 2 |
| Navigation menu content | Phase 2 |
