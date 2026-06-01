# Component Standards

## Purpose

This document defines standards for all React components used within The Developer's Voyage.

Every component must follow these rules.

---

# Component Philosophy

Components are responsible for rendering UI.

Components are not responsible for:

* Fetching data
* Managing business rules
* Managing application architecture
* Owning feature workflows

Components display information.

Features orchestrate behavior.

Services communicate externally.

Stores own state.

---

# Component Classification

Every component must belong to one of the following categories.

---

## UI Components

Purpose:

Reusable design system components.

Examples:

Button

Input

Dialog

Tooltip

Card

Badge

---

Location:

components/ui/

---

## Common Components

Purpose:

Reusable application components.

Examples:

AudioToggle

LoadingOverlay

PageTransition

NavigationButton

---

Location:

components/common/

---

## Layout Components

Purpose:

Page and layout structure.

Examples:

Header

Footer

Sidebar

WorldLayout

IslandLayout

---

Location:

components/layout/

---

## Feature Components

Purpose:

Feature-specific UI.

Examples:

ProjectIslandCard

VoyageTimeline

ShipNavigatorPanel

---

Location:

features/*

---

# File Structure

Simple Components

button.tsx

---

Complex Components

project-card/

├── project-card.tsx
├── project-card.types.ts
├── project-card.constants.ts
├── project-card.test.tsx
└── index.ts

---

Rule

If component exceeds 200 lines:

Evaluate splitting.

If component exceeds 300 lines:

Refactor is mandatory.

---

# Component Structure

Order:

Imports

Constants

Types

Component

Exports

---

Preferred Example

imports

↓

component constants

↓

props type

↓

component implementation

↓

export

---

# Props Standards

Use explicit props.

Bad

data

item

value

config

Good

project

navigationRoute

audioSettings

islandDefinition

---

# Props Interface Naming

Component

ProjectCard

↓

ProjectCardProps

---

Example

type ProjectCardProps = {
project: Project;
onSelect: () => void;
};

---

# Children Usage

Use children only when composition is intended.

Bad

Using children for every component.

Good

Modal

Dialog

Layout

Container

---

# Event Handler Naming

Use:

on*

Examples

onClick

onClose

onSelect

onNavigate

onPlay

---

Internal handlers

handle*

Examples

handleClick

handleSubmit

handleNavigation

handleAudioToggle

---

# Conditional Rendering

Prefer:

Early return

Example

if (!project) {
return null;
}

Avoid:

Deep nested ternaries.

---

# Component Responsibility Rules

A component should answer:

What does it render?

Not:

What business process does it execute?

---

# Forbidden Inside Components

API calls

Direct fetch

Axios calls

Complex business logic

Store creation

Environment configuration

---

# Allowed Inside Components

Rendering

Events

Formatting

Local state

Animation triggers

---

# Styling Rules

Prefer:

Tailwind

shadcn

Design tokens

Avoid:

Inline styles

Magic spacing

Hardcoded colors

---

Bad

className="text-blue-500"

Good

className="text-ocean-primary"

---

# Accessibility Rules

Every interactive component must support:

Keyboard navigation

Focus states

Screen reader labels

Semantic HTML

---

# Memoization Rules

Do NOT use:

useMemo

useCallback

React.memo

by default.

Only use after profiling.

---

# Reusability Checklist

Before creating a component ask:

Can existing component solve this?

Can current component be extended?

Is this truly feature-specific?

Can this become a shared component?

---

# Definition Of Done

A component is complete when:

✓ Typed

✓ Accessible

✓ Tested

✓ Documented

✓ Responsive

✓ Uses design tokens

✓ Contains no business logic

✓ Follows naming standards
