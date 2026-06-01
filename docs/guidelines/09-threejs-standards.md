# Three.js Standards

## Purpose

This document defines all standards for Three.js, React Three Fiber, Drei, and world-engine development.

Three.js is the rendering engine of the world.

React is the application layer.

These responsibilities must remain separate.

---

# Three.js Philosophy

Three.js owns:

* World
* Ocean
* Ship
* Islands
* Environment
* Camera
* Lighting
* Particles
* Effects

Three.js does NOT own:

* Forms
* Content
* Business logic
* Application state
* API communication

---

# World Architecture

Structure:

three/

core/

world/

objects/

environment/

effects/

cameras/

controls/

loaders/

materials/

shaders/

utils/

---

# Folder Responsibilities

## core/

Contains:

Canvas setup

Renderer setup

Scene providers

Global world initialization

---

## world/

Contains:

World composition

Example:

World

↓

Ocean

↓

Ship

↓

Islands

↓

Routes

---

## objects/

Contains:

Reusable world objects.

Examples:

Ship

Island

PalmTree

Dock

Lantern

Rock

Cloud

---

## environment/

Contains:

Sky

Fog

Lighting

Atmosphere

Weather

Moon

Sun

---

## effects/

Contains:

Post-processing.

Examples:

Bloom

Depth Of Field

Chromatic Aberration

Vignette

---

## cameras/

Contains:

Camera systems.

Examples:

WorldCamera

IslandFocusCamera

CinematicCamera

---

## controls/

Contains:

Orbit controls

Navigation controls

Interaction controls

---

# Object Standards

Every 3D object must:

Have its own folder.

Example:

ship/

├── ship.tsx
├── ship.types.ts
├── ship.constants.ts
└── index.ts

---

# Object Naming

Use PascalCase.

Examples:

Ship

Island

WorldFog

NavigationRoute

---

# Component Size Rules

Object components:

Maximum

250 lines

If exceeded:

Split logic.

---

# Model Loading

All model loading must go through loaders.

Forbidden:

Loading GLB directly inside object component.

Bad:

useGLTF("/ship.glb")

inside random component.

Good:

ship.loader.ts

↓

Ship component

---

# Materials

Materials must be reusable.

Avoid:

Creating new materials everywhere.

Create:

ocean.material.ts

ship.material.ts

fog.material.ts

---

# Camera Rules

Camera logic belongs only in:

cameras/

Forbidden:

Camera manipulation inside random components.

---

# Animation Rules

World animations:

GSAP

or

Frame updates

Never mix approaches unnecessarily.

---

# useFrame Rules

Allowed:

Ocean waves

Ship movement

Particles

Camera updates

Forbidden:

Business logic

Data manipulation

Network requests

---

# Interaction Rules

3D interactions should only emit events.

Bad:

Island click

↓

Directly open modal

Good:

Island click

↓

Emit navigation event

↓

React layer decides UI

---

# Performance Rules

Every object must answer:

How many instances?

How many vertices?

How many draw calls?

---

# Instancing Rules

Use instancing when:

10+ repeated objects.

Examples:

Trees

Rocks

Lanterns

Clouds

---

# Asset Rules

Preferred:

GLB

Forbidden:

Massive FBX files

Unoptimized models

---

# Scene Rules

World scene must remain composable.

Bad:

One gigantic World.tsx

Good:

World

↓

Ocean

Ship

Islands

Routes

Lighting

Effects

---

# State Rules

Three.js never owns application state.

State belongs to Zustand.

Three.js reads state.

Never controls state architecture.

---

# Definition Of Done

A Three.js feature is complete when:

✓ Typed

✓ Reusable

✓ Optimized

✓ Documented

✓ Tested

✓ Uses approved architecture

✓ No business logic

✓ No duplicated materials

✓ No direct application ownership
