# Three.js Performance Guide

## Purpose

This document defines performance standards and optimization strategies for the world engine.

Performance is a core feature.

A beautiful world that runs poorly is a failed implementation.

---

# Performance Targets

Desktop

60 FPS

---

Laptop

50+ FPS

---

Mobile

30+ FPS minimum

---

# Golden Rule

Measure first.

Optimize second.

Never optimize based on assumptions.

---

# Performance Budget

World Initialization

< 3 seconds

---

Route Transitions

< 500 ms

---

Island Focus Animation

< 300 ms

---

Model Load

< 2 seconds

---

# Asset Budget

Ship

Maximum 5 MB

---

Island

Maximum 2 MB

---

Single Building

Maximum 1 MB

---

Props

Maximum 300 KB

---

Texture

Maximum 2048x2048

Prefer:

1024x1024

---

# Model Standards

Preferred Format

GLB

---

Avoid

FBX

OBJ

High-poly models

---

# Draw Call Guidelines

Target

< 150 draw calls

---

Warning

150-250 draw calls

---

Critical

250+ draw calls

---

# Instancing Rules

Use InstancedMesh when:

10+ repeated objects exist.

Examples

Trees

Lanterns

Rocks

Clouds

Grass

---

# Geometry Rules

Reuse geometry whenever possible.

Bad

New geometry every render.

Good

Shared geometry.

---

# Material Rules

Reuse materials.

Bad

100 materials

100 objects

---

Good

1 material

100 objects

---

# Texture Rules

Use compressed textures.

Preferred

WebP

KTX2

---

Avoid

Large PNG textures

Unused textures

---

# Lighting Rules

Start simple.

Preferred

AmbientLight

DirectionalLight

HemisphereLight

---

Avoid

Multiple shadow-casting lights

without profiling.

---

# Shadow Rules

Shadows are expensive.

Only enable where required.

---

# Post Processing Rules

Use only if justified.

Examples

Bloom

Depth Of Field

Fog

---

Each effect must answer:

What value does it add?

What cost does it introduce?

---

# Camera Optimization

Do not update camera every frame unnecessarily.

Use:

GSAP

State transitions

Controlled updates

---

# useFrame Guidelines

Allowed

Ocean animation

Particles

Camera interpolation

---

Forbidden

API requests

Business logic

State mutations

Complex calculations

---

# Frustum Culling

Required for large worlds.

Objects outside camera view should not render.

---

# Level Of Detail (LOD)

Required for distant objects.

Examples

Far Island

↓

Low Poly

Near Island

↓

High Detail

---

# Lazy Loading

Required for:

Project islands

Optional environments

Large assets

Advanced effects

---

# Dynamic Imports

Required for:

Heavy systems

Large scenes

Experimental features

---

# React Rules

Avoid rerenders.

Use:

Stable references

Memoized calculations only when justified

Proper state ownership

---

# State Rules

Do not store large objects in Zustand.

Store:

IDs

References

Metadata

---

Avoid:

Meshes

Materials

Textures

---

# Asset Pipeline

Every asset must pass:

Download

↓

Review

↓

Optimize

↓

Compress

↓

Rename

↓

Import

---

# Asset Review Checklist

Before adding any model:

✓ Poly count reviewed

✓ File size reviewed

✓ Materials reviewed

✓ Textures reviewed

✓ Naming standards followed

✓ Optimized version created

---

# Ocean Optimization

Ocean is the most expensive persistent object.

Rules:

Reuse shader materials

Avoid excessive subdivisions

Limit reflection complexity

Profile regularly

---

# Island Optimization

Build islands from reusable assets.

Avoid giant monolithic models.

Preferred

Island Base

*

Trees

*

Structures

*

Props

---

# Profiling Tools

Required

React DevTools

Three.js Inspector

Browser Performance Tab

FPS Monitor

---

# Performance Review Checklist

Before merge:

✓ FPS measured

✓ Draw calls measured

✓ Asset size reviewed

✓ Memory impact reviewed

✓ Mobile tested

✓ No unnecessary rerenders

✓ No duplicated materials

✓ No oversized textures

---

# Definition Of Done

A Three.js feature is complete when:

✓ 60 FPS desktop target maintained

✓ Assets optimized

✓ Draw calls acceptable

✓ Memory usage reviewed

✓ Mobile tested

✓ Profiling completed

✓ Performance documented

Performance is not optional.

Every feature must earn its place in the world.
