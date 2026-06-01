# TypeScript Standards

## Purpose

This document defines TypeScript standards for the project.

TypeScript is not optional.

Type safety is a core architectural requirement.

---

# TypeScript Philosophy

The goal is:

Catch errors at compile time.

Not at runtime.

---

# Strict Mode

Mandatory.

tsconfig.json

strict = true

No exceptions.

---

# Forbidden

any

ts-ignore

double assertions

unsafe casting

---

Bad

const data: any

---

Bad

value as any

---

Bad

value as unknown as Project

---

# Preferred

Explicit types

Generics

Type inference

Discriminated unions

---

# Type First Development

Before implementation ask:

What is the type?

Design data contracts first.

Implementation second.

---

# Type Location Rules

Shared Types

↓

types/

Feature Types

↓

feature folder

---

Examples

types/

project.types.ts

navigation.types.ts

world.types.ts

---

features/

projects/

project-card.types.ts

---

# Interface vs Type

Preferred

type

Use by default.

---

Use interface only when:

Extension is required.

---

Good

type Project = {}

---

Allowed

interface WorldConfig {}

---

# Naming Rules

Types

PascalCase

Examples

Project

NavigationRoute

IslandDefinition

WorldSettings

---

# Props Types

ComponentNameProps

Example

type ProjectCardProps

type AudioToggleProps

type WorldMapProps

---

# API Types

Separate request and response types.

Bad

Project

Used for everything.

---

Good

ProjectResponse

CreateProjectRequest

UpdateProjectRequest

---

# Enum Usage

Avoid enums unless necessary.

Prefer:

const objects

union types

---

Preferred

type IslandType =
| "home"
| "skills"
| "project"
| "harbor";

---

# Union Types

Prefer unions over booleans.

Bad

isLoading

isError

isSuccess

---

Good

status:
"idle"
| "loading"
| "success"
| "error"

---

# Nullable Values

Be explicit.

Bad

project?

---

Good

project: Project | null

---

# Function Return Types

Public functions must define return types.

Example

function getProject(): Project

---

# Async Functions

Always type return values.

Bad

async function getProject()

---

Good

async function getProject(): Promise<Project>

---

# Readonly Usage

Use readonly wherever possible.

Example

readonly id: string

---

Reason

Prevent accidental mutation.

---

# Constants Typing

Use as const where applicable.

Example

export const ISLAND_TYPES = {
HOME: "home",
PROJECT: "project",
} as const;

---

# Generic Usage

Prefer meaningful names.

Bad

<T>

<U>

---

Good

<TProject>

<TResponse>

<TData>

---

# Unknown vs Any

Use unknown.

Never any.

Bad

value: any

---

Good

value: unknown

---

# Utility Types

Encouraged

Partial

Pick

Omit

Readonly

Record

Required

---

# Zod Integration

Zod schema

↓

Type inference

Preferred

type ContactForm =
z.infer<typeof contactSchema>;

---

# Error Types

Never throw raw strings.

Bad

throw "Error"

---

Good

throw new Error()

---

# Definition Of Done

✓ No any

✓ No unsafe casting

✓ Explicit public types

✓ API contracts typed

✓ Zod integration

✓ Strict mode compatible

✓ Compile-time safe
