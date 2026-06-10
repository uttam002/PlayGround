// animation.constants.ts
// All timing and easing values for animations across the app.
// Grouped as a single ANIMATION object — access via ANIMATION.DURATION.FAST, ANIMATION.EASE.CINEMATIC, etc.

export const ANIMATION = {
  // Duration in milliseconds
  DURATION: {
    FAST: 200,
    NORMAL: 400,
    SLOW: 800,
    CINEMATIC: 2000,
  },

  // GSAP easing strings
  EASE: {
    DEFAULT: 'power2.inOut',
    CINEMATIC: 'power4.inOut',
    SNAPPY: 'power3.out',
    SMOOTH: 'power2.out',
  },

  // Framer Motion variants (reusable across UI components)
  VARIANT: {
    FADE_IN: { opacity: 0, y: 8 },
    FADE_IN_ACTIVE: { opacity: 1, y: 0 },
    FADE_OUT: { opacity: 0, y: -8 },
  },
} as const;
