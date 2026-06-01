# API Service Standards

## Purpose

This document defines standards for:

* API communication
* Service layer implementation
* React Query integration
* Error handling
* Request lifecycle management

All external communication must follow these standards.

---

# Architecture Overview

Allowed Flow

UI

↓

Feature

↓

Hook

↓

Service

↓

API Client

↓

Backend

---

Forbidden Flow

Component

↓

Axios

↓

Backend

---

# Folder Structure

services/

api/

project.api.ts

contact.api.ts

assistant.api.ts

analytics.api.ts

---

services/

project.service.ts

contact.service.ts

assistant.service.ts

---

# Responsibility Rules

## API Layer

Responsible For:

HTTP communication only.

Examples:

GET

POST

PUT

DELETE

---

Forbidden:

Business logic

Formatting

UI logic

State manipulation

---

## Service Layer

Responsible For:

Business operations.

Examples:

Project retrieval

Contact submission

Assistant orchestration

---

Forbidden:

Rendering

React hooks

Component logic

---

# Axios Configuration

Single instance only.

Example:

lib/api/api-client.ts

Responsibilities:

Base URL

Headers

Interceptors

Authentication

Timeouts

---

Forbidden:

Creating axios instances inside services.

---

# Service Naming

feature.service.ts

Examples:

project.service.ts

contact.service.ts

assistant.service.ts

---

Class Naming

ProjectService

ContactService

AssistantService

---

# API Naming

feature.api.ts

Examples:

project.api.ts

contact.api.ts

assistant.api.ts

---

# Method Naming

Use verbs.

Good:

getProjects

getProjectBySlug

createContactMessage

sendAssistantPrompt

updateUserPreferences

---

Bad:

projects

projectData

contact

assistant

---

# Error Handling Rules

Every API call must handle:

Network failures

Timeouts

Server errors

Unexpected responses

---

Forbidden

Empty catch blocks.

Bad

catch {}

---

Required

Logging

User feedback

Recovery path

---

# Response Typing

Every response must be typed.

Forbidden

Promise<any>

Response<any>

---

Good

Promise<Project>

Promise<Project[]>

Promise<ContactResponse>

---

# React Query Ownership

React Query owns:

Fetching

Caching

Refetching

Synchronization

Retry logic

---

Services own:

Request implementation

Business behavior

---

# Query Key Rules

Every query key must be centralized.

Example:

query-keys.constants.ts

PROJECTS

PROJECT_DETAILS

NAVIGATION_DATA

ASSISTANT_CONTEXT

---

Forbidden

Inline query keys.

---

# Retry Rules

Do not retry blindly.

Examples

Analytics

0 retries

Projects

1 retry

Assistant

1 retry

Critical data

2 retries

---

# Logging Rules

All API failures should be loggable.

Never lose errors silently.

---

# Mock Data Rules

Development mocks must be isolated.

Location

mocks/

Never mixed with production code.

---

# Definition Of Done

An API implementation is complete when:

✓ Typed

✓ Error handled

✓ Logged

✓ Query key centralized

✓ Service separated

✓ No axios duplication

✓ No hardcoded endpoints

✓ Tested
