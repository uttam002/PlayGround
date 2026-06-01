# Constants & Configuration Rules

## Purpose

This document eliminates:

Magic values

Hardcoded strings

Scattered configuration

Duplicate settings

The project should be fully configurable.

---

# Golden Rule

If a value appears more than once:

Evaluate extraction.

If a value appears three times:

Extraction is mandatory.

---

# Folder Structure

src/

constants/

config/

---

# Difference Between Constants & Config

Constants

Static

Never change

Examples:

Animation durations

Route names

Labels

---

Config

Controls application behavior

Examples:

World settings

Feature toggles

Environment mapping

---

# Constants Structure

constants/

animation.constants.ts

audio.constants.ts

camera.constants.ts

navigation.constants.ts

world.constants.ts

route.constants.ts

ui.constants.ts

query-keys.constants.ts

---

# Config Structure

config/

app.config.ts

world.config.ts

navigation.config.ts

assistant.config.ts

feature-flags.config.ts

---

# String Rules

Forbidden

Hardcoded strings inside components.

Bad

<Button>
 Resume
</Button>

---

Good

<Button>
 {UI_LABELS.RESUME}
</Button>

---

# Label Management

Create:

ui.constants.ts

Example

UI_LABELS

BUTTON_LABELS

NAVIGATION_LABELS

FORM_LABELS

---

# Route Rules

Never hardcode routes.

Bad

router.push("/projects")

---

Good

router.push(APP_ROUTES.PROJECTS)

---

# Animation Rules

All animation values must be centralized.

Bad

duration: 300

---

Good

duration: ANIMATION_DURATION_FAST

---

# Camera Rules

All camera settings centralized.

camera.constants.ts

Examples

DEFAULT_CAMERA_DISTANCE

CAMERA_MIN_ZOOM

CAMERA_MAX_ZOOM

---

# World Rules

world.constants.ts

Examples

MAX_ISLAND_COUNT

DEFAULT_ISLAND_SCALE

WORLD_FOG_DENSITY

WORLD_RADIUS

---

# Audio Rules

audio.constants.ts

Examples

DEFAULT_VOLUME

OCEAN_AMBIENCE_VOLUME

HARBOR_AMBIENCE_VOLUME

---

# Query Key Rules

query-keys.constants.ts

Examples

PROJECTS

PROJECT_DETAILS

WORLD_DATA

ASSISTANT_DATA

---

# Environment Access Rules

Forbidden

process.env usage throughout project.

---

Allowed

config/app.config.ts

Example

export const APP_CONFIG

---

Single source of truth.

---

# Feature Flags

feature-flags.config.ts

Examples

ENABLE_AI_ASSISTANT

ENABLE_AUDIO_SYSTEM

ENABLE_DYNAMIC_WEATHER

ENABLE_PARTICLE_EFFECTS

---

# Default Values

Every default value must be centralized.

Forbidden

const pageSize = 10

---

Good

DEFAULT_PAGE_SIZE

---

# Color Rules

No raw colors inside components.

Bad

text-blue-500

bg-yellow-400

---

Good

Theme token

Semantic token

CSS variable

---

# Z-Index Rules

Centralized.

Examples

Z_INDEX_MODAL

Z_INDEX_OVERLAY

Z_INDEX_WORLD_UI

---

# Timing Rules

Centralized.

Examples

LOADING_DELAY

TRANSITION_DURATION

CAMERA_TRAVEL_DURATION

---

# Asset Paths

Centralized.

Bad

"/audio/ocean.mp3"

---

Good

AUDIO_ASSETS.OCEAN

---

# Naming Rules

Constants

UPPER_SNAKE_CASE

Config

camelCase object

Readonly where possible

---

# Review Checklist

Before merging:

✓ No hardcoded strings

✓ No hardcoded routes

✓ No magic numbers

✓ No duplicated values

✓ No direct environment access

✓ Config separated from constants

✓ Centralized defaults

---

# Definition Of Done

A feature is compliant when:

✓ Strings centralized

✓ Routes centralized

✓ Config centralized

✓ Constants centralized

✓ Environment abstracted

✓ No magic values remain
