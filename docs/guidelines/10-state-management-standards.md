# State Management Standards

## Purpose

This document defines all state ownership rules.

State is one of the most common sources of technical debt.

Every state variable must have a clear owner.

---

# State Hierarchy

Use:

Local State

↓

Feature State

↓

Global State

↓

Server State

---

# Local State

Use:

useState

Examples:

Modal open

Input value

Tooltip visibility

Hover state

---

# Feature State

Use:

Feature hooks

Examples:

Project filtering

Island selection

Timeline controls

---

# Global State

Use:

Zustand

Examples:

Audio settings

World navigation

Current island

Theme settings

Camera mode

---

# Server State

Use:

React Query

Examples:

Projects

Contact data

Analytics

Assistant responses

---

# Golden Rule

Do not promote state unnecessarily.

Ask:

Can this stay local?

If yes:

Keep it local.

---

# Store Structure

store/

audio.store.ts

world.store.ts

navigation.store.ts

theme.store.ts

assistant.store.ts

---

# Store Naming

Hook Name:

useAudioStore

useWorldStore

useNavigationStore

---

# Store Responsibility

Store owns:

State

Actions

Selectors

Store does NOT own:

API calls

Rendering

Complex calculations

---

# Store Example Structure

State

↓

Actions

↓

Selectors

---

# Action Naming

Use verbs.

Examples:

setCurrentIsland

setCameraMode

toggleAudio

navigateToIsland

---

# Selector Naming

Use:

select*

Examples:

selectCurrentIsland

selectAudioEnabled

selectCameraMode

---

# Derived State Rules

Do not store derived state.

Bad:

filteredProjects

projectCount

selectedProjectTitle

Good:

Calculate from source state.

---

# React Query Rules

React Query owns:

Fetching

Caching

Retries

Synchronization

---

# Forbidden

Copying React Query data into Zustand.

Unless absolutely necessary.

---

# Persistence Rules

Only persist:

Theme

Audio

Preferences

Never persist:

Temporary UI state

Loading state

Errors

---

# State Updates

Always use actions.

Forbidden:

Direct mutations.

---

# Cross Store Communication

Avoid store-to-store dependencies.

Bad:

Audio store imports world store.

Good:

Feature orchestrates interaction.

---

# Store Size Rules

Store exceeds:

300 lines

↓

Review structure.

Store exceeds:

500 lines

↓

Mandatory refactor.

---

# Global State Checklist

Before creating store state ask:

Does multiple features need this?

Does it survive page transitions?

Is it truly global?

If no:

Do not use Zustand.

---

# Error State Ownership

Errors belong to:

Feature

or

React Query

Never global unless required.

---

# Loading State Ownership

Loading belongs closest to source.

Avoid:

Global loading store.

---

# Testing Requirements

Every store must test:

State changes

Actions

Selectors

Persistence

---

# Definition Of Done

A store is complete when:

✓ Typed

✓ Minimal

✓ Tested

✓ Documented

✓ Uses actions

✓ Uses selectors

✓ No duplicated state

✓ No API ownership

✓ No rendering ownership
