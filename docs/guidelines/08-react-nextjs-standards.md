# React & Next.js Standards

## Purpose

This document defines React, Next.js, App Router, and TypeScript implementation standards.

These standards are mandatory for all frontend development.

---

# React Philosophy

Prefer:

Simple React

Composable React

Predictable React

Avoid:

Over-engineering

Complex abstractions

Premature optimization

---

# Component Declaration

Always use:

Named functions

Preferred

export function ProjectCard() {}

Avoid

const ProjectCard = () => {}

Reason

Better stack traces

Better readability

Consistent codebase

---

# Export Rules

Prefer named exports.

Good

export function AudioToggle()

Avoid

export default function AudioToggle()

Reason

Refactoring becomes safer.

---

# Server Components First

Default:

Server Component

Only use:

"use client"

when required.

---

# Use Client Rules

Allowed:

Animations

State

Browser APIs

Event handlers

---

Forbidden:

Adding use client by default.

---

# Async Components

Server components may be async.

Example

export async function Page()

Use this whenever possible.

---

# Data Fetching

Preferred order:

Server Components

↓

React Query

↓

Client Fetching

Avoid:

Fetching directly inside UI components.

---

# State Management Rules

Local state

useState

Feature state

Zustand

Server state

React Query

URL state

searchParams

---

# Custom Hooks Rules

Hooks own behavior.

Hooks do NOT own rendering.

Good

useNavigation()

useAudio()

useCamera()

Bad

Hook returning JSX.

---

# Error Handling

Never swallow errors.

Bad

try {
}
catch {}

Good

Log

Handle

Recover

Show feedback

---

# Environment Variables

Never access process.env directly in components.

Use:

config layer

Example

app.config.ts

---

# Route Structure

Use route groups.

Example

(marketing)

(portfolio)

(admin)

---

# Layout Rules

Use layouts for:

Shared UI

Shared providers

Shared navigation

Avoid duplication.

---

# Loading States

Every route must support:

loading.tsx

Avoid blank screens.

---

# Error States

Every major route should support:

error.tsx

---

# Not Found

Every major feature should support:

not-found.tsx

---

# Forms

Mandatory:

React Hook Form

*

Zod

Avoid:

Manual validation

---

# API Communication

Never call API directly inside components.

Use:

Services

↓

Hooks

↓

Components

---

# React Query Rules

Every query:

query key constant

typed response

error handling

loading handling

---

# Side Effects

Keep useEffect minimal.

Ask first:

Can this be solved without useEffect?

Most useEffect usage should be questioned.

---

# Suspense

Use Suspense for:

Server boundaries

Lazy features

Heavy components

---

# Dynamic Imports

Required for:

Heavy Three.js systems

Large visual effects

Optional experiences

---

# Performance Rules

Measure first.

Optimize second.

Never optimize based on assumptions.

---

# TypeScript Rules

Strict mode required.

Never use:

any

Prefer:

unknown

specific types

generics

---

# Code Review Checklist

Before merging:

✓ No unnecessary use client

✓ No default exports

✓ No any

✓ No direct API calls in components

✓ No hardcoded values

✓ No duplicated logic

✓ Proper error handling

✓ Proper loading states

✓ Proper typing

✓ Accessibility verified

✓ Follows component standards

---

# Definition Of Done

A React/Next.js implementation is complete when:

✓ Server-first

✓ Fully typed

✓ Accessible

✓ Responsive

✓ Error handled

✓ Loading handled

✓ Tested

✓ Uses approved architecture

✓ Follows engineering standards
