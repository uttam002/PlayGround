# Folder Ownership Guidelines

## Purpose

This document defines ownership boundaries for every major folder in the project.

Every file must have a clear home.

Every folder must have a clear responsibility.

If a file does not clearly belong to a folder, stop and determine ownership before implementation.

---

# Golden Rule

A folder owns a responsibility.

A folder does NOT own a technology.

Bad:

utils/

helpers/

misc/

common/

These become dumping grounds.

Good:

world/

navigation/

assistant/

api/

Each folder has clear ownership.

---

# Dependency Hierarchy

Allowed flow:

Config
↓
Constants
↓
Services
↓
Store
↓
Features
↓
Components
↓
Pages

Forbidden:

Pages
↓
Mutating services directly

Components
↓
Calling APIs directly

Features
↓
Importing from pages

---

# Root Structure

src/

app/

components/

features/

services/

store/

lib/

config/

constants/

types/

hooks/

providers/

assets/

styles/

three/

---

# src/app

## Purpose

Application routing layer.

Next.js routing only.

---

## Allowed Content

Routes

Layouts

Templates

Loading states

Error boundaries

Metadata

---

## Forbidden Content

Business logic

API calls

Store creation

Validation logic

Utility functions

Three.js scene logic

---

## Example

Good:

app/projects/page.tsx

app/layout.tsx

app/loading.tsx

Bad:

app/page.tsx containing 500 lines of business logic

---

# src/features

## Purpose

Feature ownership layer.

Every major feature belongs here.

---

## Examples

features/

world/

navigation/

islands/

assistant/

contact/

timeline/

projects/

---

## Responsibilities

Feature orchestration

Feature-specific state

Feature-specific hooks

Feature configuration

Feature composition

---

## Forbidden

Generic reusable UI

Global utilities

Application configuration

---

## Rule

If a feature can be deleted without affecting unrelated features:

It belongs in features.

---

# src/components

## Purpose

Reusable UI layer.

---

## Contains

Buttons

Inputs

Dialogs

Cards

Overlays

Navigation controls

Panels

Layout primitives

---

## Examples

components/ui

components/layout

components/common

---

## Forbidden

API calls

Feature ownership

Business logic

Store creation

---

## Rule

Components must be reusable.

If component name contains a business concept:

Evaluate whether it belongs in features instead.

---

# src/services

## Purpose

External communication layer.

---

## Responsibilities

HTTP requests

Email services

Analytics services

CMS services

External integrations

---

## Examples

project.service.ts

contact.service.ts

analytics.service.ts

---

## Forbidden

React hooks

UI rendering

State management

---

## Rule

Services talk to the outside world.

Nothing else.

---

# src/store

## Purpose

Global state ownership.

---

## Responsibilities

Application state

User preferences

Audio settings

Navigation state

World state

---

## Examples

audio.store.ts

navigation.store.ts

world.store.ts

---

## Forbidden

API requests

Validation

Rendering

Complex business logic

---

## Rule

Stores own state.

Not behavior.

---

# src/hooks

## Purpose

Reusable React hooks.

---

## Naming

Must begin with:

use

Examples:

useCamera

useNavigation

useAudio

useIslandFocus

---

## Forbidden

Rendering JSX

Creating UI

Page ownership

---

## Rule

Hooks provide behavior.

Not UI.

---

# src/constants

## Purpose

Static application values.

---

## Examples

animation.constants.ts

camera.constants.ts

route.constants.ts

theme.constants.ts

---

## Allowed

Enums

Readonly objects

Constant maps

---

## Forbidden

Functions

Classes

Runtime logic

---

## Rule

Constants never execute logic.

---

# src/config

## Purpose

Runtime configuration.

---

## Examples

app.config.ts

world.config.ts

feature-flags.config.ts

navigation.config.ts

---

## Difference From Constants

Constants:

Never change.

Config:

Controls application behavior.

---

# src/types

## Purpose

Shared type ownership.

---

## Examples

project.types.ts

navigation.types.ts

world.types.ts

api.types.ts

---

## Allowed

Types

Interfaces

Enums

Utility types

---

## Forbidden

Functions

Classes

Business logic

---

# src/lib

## Purpose

Shared technical utilities.

---

## Examples

formatters

parsers

validators

helpers

utility functions

---

## Rule

Must be feature agnostic.

---

## Forbidden

Project-specific logic

Island-specific logic

World-specific logic

---

# src/providers

## Purpose

Application provider ownership.

---

## Examples

QueryProvider

ThemeProvider

AudioProvider

AnalyticsProvider

---

## Rule

Providers initialize systems.

Nothing else.

---

# src/styles

## Purpose

Global styling system.

---

## Examples

globals.css

variables.css

theme.css

animations.css

typography.css

---

## Forbidden

Component-specific styles

Feature-specific styles

---

# src/assets

## Purpose

Static assets.

---

## Structure

assets/

images/

audio/

fonts/

icons/

models/

shaders/

textures/

---

## Rule

Assets only.

No code.

---

# src/three

## Purpose

Three.js world engine.

---

## Structure

three/

core/

world/

objects/

effects/

environment/

controls/

cameras/

loaders/

---

## Responsibilities

Ocean

Ship

Islands

Lighting

Particles

Camera

Environment

---

## Forbidden

Forms

Buttons

Contact logic

Business logic

---

## Rule

Three.js owns visuals.

React owns content.

---

# Import Rules

Good:

Feature
↓
Components

Feature
↓
Hooks

Feature
↓
Services

---

Forbidden:

Component
↓
Feature

Component
↓
Page

Store
↓
Page

---

# File Placement Checklist

Before creating a file ask:

What responsibility does it own?

Can it be reused?

Does it belong to a feature?

Does it belong to the world engine?

Does it communicate externally?

Does it manage state?

The answer determines the folder.

Never choose a folder based on convenience.

Choose based on ownership.

---

# Definition Of Correct Structure

A developer should be able to locate any file in under 30 seconds.

If file placement requires explanation:

The structure is wrong.
