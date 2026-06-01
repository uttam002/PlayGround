# Code Review Checklist

## Purpose

This document defines the mandatory review checklist for all code changes.

Every pull request must satisfy these requirements before approval.

Code review is not optional.

Code review protects:

* Maintainability
* Consistency
* Performance
* Scalability
* Security

---

# Review Philosophy

Review the code as if:

You will maintain it for the next 5 years.

Not:

You will forget it tomorrow.

---

# Architecture Review

## Verify Ownership

Ask:

Does this file belong in this folder?

Does this responsibility belong here?

---

## Verify Boundaries

Check:

Components do not own API calls.

Stores do not own business logic.

Three.js does not own application state.

Services do not own rendering.

---

## Verify Reusability

Ask:

Can this be reused?

Is this duplicated?

Should this become a shared abstraction?

---

# Naming Review

Check:

✓ Naming conventions followed

✓ Explicit names used

✓ No abbreviations

✓ No vague file names

✓ Component names clear

✓ Hook names begin with use

✓ Store names follow standards

---

# TypeScript Review

Check:

✓ No any

✓ No ts-ignore

✓ No unsafe casting

✓ Public functions typed

✓ API contracts typed

✓ Generics meaningful

✓ Nullable values explicit

---

# React Review

Check:

✓ No unnecessary use client

✓ No default exports

✓ No excessive useEffect

✓ Proper component composition

✓ No business logic in components

✓ Proper loading states

✓ Proper error states

---

# Next.js Review

Check:

✓ Server Components preferred

✓ Route structure correct

✓ Metadata present

✓ Dynamic imports used where appropriate

✓ Suspense used correctly

---

# State Review

Check:

✓ State ownership correct

✓ No duplicated state

✓ Zustand only where required

✓ Derived state not stored

✓ Actions named correctly

✓ Selectors present

---

# API Review

Check:

✓ Service layer used

✓ No direct axios calls

✓ Error handling implemented

✓ Query keys centralized

✓ Responses typed

✓ Loading states handled

---

# Constants Review

Check:

✓ No magic values

✓ No hardcoded strings

✓ No hardcoded routes

✓ No duplicated configuration

✓ Environment access centralized

---

# Three.js Review

Check:

✓ Object ownership correct

✓ Camera ownership correct

✓ Materials reused

✓ Assets optimized

✓ No business logic in world layer

✓ Performance impact evaluated

---

# Accessibility Review

Check:

✓ Keyboard navigation

✓ Focus management

✓ Semantic HTML

✓ Labels present

✓ Screen reader compatibility

---

# Performance Review

Check:

✓ No unnecessary rerenders

✓ No expensive calculations

✓ No unused dependencies

✓ No large bundle increases

✓ Dynamic imports evaluated

---

# Testing Review

Check:

✓ Unit tests added

✓ Integration tests added

✓ Critical flows covered

✓ Edge cases tested

✓ Failure paths tested

---

# Documentation Review

Check:

✓ Significant decisions documented

✓ New systems documented

✓ Public APIs documented

✓ Examples provided

---

# Security Review

Check:

✓ Input validation

✓ Sensitive data protected

✓ Environment variables handled correctly

✓ No secrets committed

✓ No unsafe rendering

---

# Final Approval Rule

A pull request is approved only when:

✓ Architecture correct

✓ Standards followed

✓ Tests passing

✓ Documentation updated

✓ Reviewer understands implementation

If reviewer cannot understand implementation quickly:

Refactor before merge.
