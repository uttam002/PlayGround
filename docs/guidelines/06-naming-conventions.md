# Naming Conventions

## Purpose

This document defines naming standards for every file, folder, component, hook, service, type, constant, store, animation, and asset in the project.

Consistency is mandatory.

A developer should be able to determine the purpose of a file simply by reading its name.

---

# General Principles

## Rule 1

Names must communicate intent.

Bad:

data.ts

utils.ts

helpers.ts

temp.ts

common.ts

Good:

project-data.ts

camera-utils.ts

navigation.constants.ts

---

## Rule 2

Avoid abbreviations.

Bad:

proj.ts

cfg.ts

nav.ts

Good:

project.ts

config.ts

navigation.ts

---

## Rule 3

Names should be explicit.

Bad:

manager.ts

handler.ts

service.ts

Good:

audio-manager.ts

camera-handler.ts

project.service.ts

---

# Folder Naming

## Standard

Use:

kebab-case

---

## Examples

Good

project-islands

navigation-system

world-map

audio-controls

Bad

ProjectIslands

projectIslands

Project_Islands

---

# File Naming

## Standard

Use:

kebab-case

---

## Examples

Good

project-card.tsx

navigation-panel.tsx

audio-toggle.tsx

camera.constants.ts

Bad

ProjectCard.tsx

projectCard.tsx

PROJECT_CARD.tsx

---

# React Component Naming

## Standard

Use:

PascalCase

---

## Examples

Good

ProjectCard

IslandNavigation

WorldMap

ShipHub

AudioToggle

Bad

projectCard

project_card

projectcard

---

# Component File Naming

Component Name:

ProjectCard

File Name:

project-card.tsx

---

## Rule

File names use kebab-case.

Component names use PascalCase.

---

# Page Naming

Next.js Routes

Folder:

kebab-case

---

Example

app/

project-islands/

page.tsx

---

# Hook Naming

## Standard

Must begin with:

use

---

Examples

useNavigation

useAudio

useWorldCamera

useIslandFocus

useProjectFilter

---

Forbidden

navigationHook

audioHelper

worldCamera

---

# Store Naming

## Standard

feature.store.ts

---

Examples

audio.store.ts

navigation.store.ts

world.store.ts

user-preferences.store.ts

---

Store Name

useAudioStore

useNavigationStore

useWorldStore

---

# Service Naming

## Standard

feature.service.ts

---

Examples

contact.service.ts

analytics.service.ts

project.service.ts

email.service.ts

---

Service Class

ContactService

AnalyticsService

ProjectService

---

# Type Naming

## Standard

PascalCase

---

Examples

Project

Island

NavigationRoute

AudioSettings

WorldState

---

# Interface Naming

## Standard

PascalCase

No I prefix.

---

Good

Project

NavigationConfig

IslandDefinition

---

Bad

IProject

INavigationConfig

IIslandDefinition

---

Reason

Modern TypeScript discourages I prefixes.

---

# Enum Naming

## Standard

PascalCase

---

Examples

IslandType

AnimationType

RouteType

AudioState

---

Enum Values

UPPER_SNAKE_CASE

---

Example

enum IslandType {
HOME,
PROJECT,
SKILLS,
HARBOR
}

---

# Constants Naming

## Standard

UPPER_SNAKE_CASE

---

Examples

DEFAULT_CAMERA_DISTANCE

MAX_ISLAND_COUNT

ANIMATION_DURATION_FAST

WORLD_FOG_DENSITY

---

Forbidden

defaultCameraDistance

animationDuration

---

# Constant Files

## Standard

feature.constants.ts

---

Examples

animation.constants.ts

audio.constants.ts

camera.constants.ts

world.constants.ts

---

# Config Files

## Standard

feature.config.ts

---

Examples

world.config.ts

audio.config.ts

navigation.config.ts

assistant.config.ts

---

# Utility Files

## Standard

feature.utils.ts

---

Examples

camera.utils.ts

audio.utils.ts

navigation.utils.ts

---

Forbidden

utils.ts

helpers.ts

common.ts

---

# Validation Files

## Standard

feature.schema.ts

---

Examples

contact.schema.ts

navigation.schema.ts

settings.schema.ts

---

Reason

Zod schemas should be immediately identifiable.

---

# API Files

## Standard

feature.api.ts

---

Examples

project.api.ts

contact.api.ts

assistant.api.ts

---

# Query Files

## Standard

feature.queries.ts

---

Examples

project.queries.ts

contact.queries.ts

---

# Mutation Files

## Standard

feature.mutations.ts

---

Examples

contact.mutations.ts

settings.mutations.ts

---

# Test File Naming

## Unit Tests

feature.test.ts

---

Examples

audio-manager.test.ts

navigation.test.ts

---

## Integration Tests

feature.integration.test.ts

---

Examples

world.integration.test.ts

assistant.integration.test.ts

---

## E2E Tests

feature.e2e.spec.ts

---

Examples

home-island.e2e.spec.ts

navigation.e2e.spec.ts

---

# CSS Variables

## Standard

--feature-property

---

Examples

--ocean-primary

--fog-opacity

--ship-glow

--island-radius

---

Forbidden

--blue

--size

--padding

---

# Environment Variables

## Public Variables

NEXT_PUBLIC_

---

Examples

NEXT_PUBLIC_APP_URL

NEXT_PUBLIC_WORLD_NAME

NEXT_PUBLIC_ANALYTICS_ID

---

## Private Variables

No prefix

---

Examples

DATABASE_URL

RESEND_API_KEY

OPENAI_API_KEY

---

# Animation Naming

## Standard

verb-target

---

Examples

fade-in

slide-up

zoom-out

ship-arrival

island-focus

camera-transition

---

# Three.js Object Naming

## Standard

PascalCase

---

Examples

Ocean

Ship

Moon

WorldFog

IslandCluster

NavigationRoute

---

# Asset Naming

## Images

kebab-case

---

Examples

home-island-preview.webp

ship-navigation-map.webp

skills-island-banner.webp

---

## Models

kebab-case

---

Examples

main-ship.glb

academy-island.glb

harbor-building.glb

---

## Audio

kebab-case

---

Examples

ocean-waves.mp3

harbor-ambience.mp3

ship-creaks.mp3

---

# Branch Naming

## Feature

feature/

---

Examples

feature/world-navigation

feature/project-islands

feature/skills-island

---

## Bug Fix

fix/

---

Examples

fix/camera-position

fix/navigation-state

---

## Refactor

refactor/

---

Examples

refactor/audio-system

refactor/world-engine

---

# Commit Message Convention

## Format

type: description

---

Examples

feat: add world navigation system

fix: resolve island focus bug

refactor: simplify audio management

docs: update architecture guidelines

test: add navigation integration tests

---

# Naming Review Checklist

Before creating anything ask:

Does the name clearly describe responsibility?

Can a new developer understand it instantly?

Does it follow project casing rules?

Does it match existing naming patterns?

Is it specific enough?

If any answer is no:

Rename it.

---

# Definition Of Good Naming

Good naming eliminates the need for explanation.

A developer should understand a file's purpose before opening it.
