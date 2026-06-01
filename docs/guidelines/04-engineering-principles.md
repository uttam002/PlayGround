# Engineering Principles

## Purpose

This document defines the engineering standards, architectural philosophy, and development mindset for The Developer's Voyage.

Every developer working on this project must follow these principles.

If any implementation conflicts with this document, the implementation must be reconsidered.

---

# Project Philosophy

The Developer's Voyage is not a traditional portfolio website.

It is a product.

It is a software system.

It is a 3D interactive experience.

Therefore every implementation must prioritize:

1. Maintainability
2. Scalability
3. Readability
4. Reusability
5. Performance
6. User Experience

Over:

* Quick solutions
* Temporary fixes
* Clever code
* Premature optimization

---

# Core Engineering Rules

## Rule 1 — Build Systems Before Pages

Always build reusable systems before feature implementations.

Bad:

Create HomeIsland component directly.

Create SkillsIsland component directly.

Create ProjectIsland component directly.

Good:

Create Island component system.

Create Navigation system.

Create Camera system.

Create World system.

Then configure specific islands.

Reason:

Systems scale.

Pages do not.

---

## Rule 2 — No Hardcoded Business Data

Never hardcode:

* Project names
* Skills
* Social links
* Routes
* Island definitions
* Animation durations
* UI labels

Bad:

const title = "Inventory System";

Good:

const title = PROJECTS.INVENTORY_SYSTEM.TITLE;

Reason:

Data should be configurable.

---

## Rule 3 — No Magic Values

Never write unexplained values.

Bad:

duration: 300

camera.position.z = 17

Good:

duration: ANIMATION_DURATION_FAST

camera.position.z = CAMERA_DEFAULT_DISTANCE

Reason:

Every value must communicate intent.

---

## Rule 4 — Single Responsibility

Every file must have one responsibility.

Bad:

Component

API call

Validation

Animation

State management

All inside same file.

Good:

One file.

One purpose.

---

## Rule 5 — Maximum Reusability

Before creating any new component ask:

Can an existing component solve this?

If no:

Can a generic version solve this?

If no:

Create a new component.

Reason:

Duplicate components become technical debt.

---

## Rule 6 — Configuration Over Duplication

Prefer configuration.

Bad:

HomeIsland.tsx

SkillsIsland.tsx

ProjectIsland.tsx

AchievementIsland.tsx

Good:

Island.tsx

island.config.ts

Reason:

The world should be data-driven.

---

## Rule 7 — Type Safety First

TypeScript is mandatory.

Forbidden:

any

double casting

unsafe assertions

Example:

Bad:

const data: any

Good:

const data: ProjectIsland

Reason:

Type errors should fail at compile time.

---

## Rule 8 — Components Must Remain Pure

UI components should only render UI.

Forbidden:

API calls

Business logic

Global state mutations

Complex calculations

Reason:

Components become predictable and testable.

---

## Rule 9 — Prefer Composition Over Inheritance

Bad:

BaseIsland

ProjectIsland extends BaseIsland

SkillsIsland extends BaseIsland

Good:

Island

IslandHeader

IslandContent

IslandActions

Reason:

Composition scales better in React.

---

## Rule 10 — Explicit Code Over Clever Code

Write code for future developers.

Not for current developers.

Bad:

One-line advanced logic.

Good:

Readable logic with clear intent.

---

# Architecture Principles

## Feature Driven Architecture

Code should be grouped by feature ownership.

Not by technical category only.

Example:

features/

navigation/

islands/

world/

assistant/

Reason:

Features evolve together.

---

## Data Flow Direction

Allowed:

Config

↓

Store

↓

Feature

↓

Component

↓

UI

Forbidden:

UI directly changing architecture state.

---

## State Ownership

Local State

Use:

useState

Global State

Use:

Zustand

Server State

Use:

React Query

Never mix responsibilities.

---

# Performance Principles

Performance is a requirement.

Not a future task.

Every feature must answer:

What is its rendering cost?

What is its memory cost?

What is its bundle cost?

---

# Three.js Principles

Three.js is reserved for:

* World
* Ocean
* Ship
* Islands
* Camera
* Effects

Three.js should never contain:

* Forms
* Menus
* Business logic
* Content rendering

Those belong to React.

---

# React Principles

React controls:

* UI
* Content
* Navigation
* Modals
* Panels

Three.js controls:

* World
* Visual environment

Keep responsibilities separate.

---

# Testing Principles

Every reusable system must be testable.

Priority:

Utilities

Hooks

Services

Stores

Then Components

---

# Documentation Principles

Every significant system requires documentation.

Required:

Purpose

Responsibilities

Dependencies

Usage examples

Future considerations

---

# Definition Of Success

Good code is:

Readable.

Predictable.

Reusable.

Performant.

Documented.

Typed.

Testable.

A developer unfamiliar with the project should understand the implementation within minutes, not hours.
