# Git Workflow

## Purpose

This document defines source control standards, branch strategy, commit conventions, pull request flow, and release practices for The Developer's Voyage.

Git history is a project asset.

A clean Git history improves:

* Debugging
* Collaboration
* Releases
* Code reviews
* Rollbacks
* Knowledge sharing

---

# Core Principles

## Rule 1

Git history should tell a story.

A developer should understand project evolution by reading commit history.

---

## Rule 2

Every commit should represent a meaningful change.

Avoid:

"fix"

"update"

"changes"

"wip"

---

## Rule 3

Never commit broken code.

Before committing:

✓ Build passes

✓ Lint passes

✓ Type check passes

---

# Branch Strategy

Main Branches

main

development

---

## main

Purpose:

Production-ready code.

Rules:

* Protected
* No direct commits
* Pull Request only

---

## development

Purpose:

Integration branch.

Rules:

* Feature branches merge here first
* Continuous testing

---

# Feature Branches

Format:

feature/<feature-name>

Examples:

feature/world-navigation

feature/ocean-system

feature/project-islands

feature/skills-island

feature/audio-system

---

# Bug Fix Branches

Format:

fix/<issue-name>

Examples:

fix/camera-focus

fix/navigation-route

fix/audio-sync

---

# Refactor Branches

Format:

refactor/<scope>

Examples:

refactor/world-store

refactor/navigation-system

refactor/camera-controller

---

# Documentation Branches

Format:

docs/<topic>

Examples:

docs/engineering-handbook

docs/world-map

---

# Experimental Branches

Format:

spike/<topic>

Purpose:

Research

Prototypes

Proof of concepts

Examples:

spike/terrain-generation

spike/ocean-shaders

spike-weather-system

---

# Commit Convention

Format:

type: description

---

# Allowed Types

feat

fix

refactor

docs

test

style

perf

build

chore

ci

---

# Examples

feat: add world navigation system

feat: create island data architecture

fix: resolve camera transition issue

refactor: simplify world store

docs: add Three.js standards

test: add navigation integration tests

perf: optimize ocean rendering

---

# Commit Rules

## One Responsibility Per Commit

Bad

feat: add navigation and fix audio and update styles

Good

feat: add navigation system

fix: resolve audio bug

style: update navigation spacing

---

## Atomic Commits

Each commit should be independently understandable.

---

# Pull Request Flow

Feature Branch

↓

Development

↓

Testing

↓

Review

↓

Approval

↓

Merge

---

# Pull Request Title

Format

[type] Description

Examples

[feat] Add world navigation system

[fix] Resolve island selection issue

[refactor] Improve camera architecture

---

# Pull Request Checklist

Required:

✓ Lint passes

✓ Type check passes

✓ Tests pass

✓ Documentation updated

✓ No merge conflicts

✓ Standards followed

---

# Merge Strategy

Use:

Squash and Merge

Reason:

Cleaner history

Readable timeline

Avoid:

Merge commits everywhere

---

# Rebase Rules

Before opening PR:

git fetch origin

git rebase origin/development

Resolve conflicts locally.

---

# Release Tagging

Format

vMAJOR.MINOR.PATCH

Examples

v1.0.0

v1.1.0

v1.2.5

---

# Versioning Strategy

Major

Breaking changes

---

Minor

New features

---

Patch

Bug fixes

---

# Forbidden Practices

Never:

Commit secrets

Commit API keys

Commit environment files

Force push shared branches

Push directly to main

Commit commented code

Commit console debugging

---

# Pre-Commit Requirements

Must pass:

npm run lint

npm run type-check

npm run test

---

# Git Ignore Requirements

Must ignore:

node_modules

.next

coverage

.env

dist

build

---

# Branch Cleanup

Delete feature branches after merge.

Avoid stale branches.

---

# Definition Of Done

Git workflow is compliant when:

✓ Correct branch strategy used

✓ Proper commit messages

✓ Clean history

✓ No direct main commits

✓ Documentation updated

✓ Standards enforced
