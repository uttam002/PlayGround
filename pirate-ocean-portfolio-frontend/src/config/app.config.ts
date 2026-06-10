// app.config.ts
// Single source of truth for all environment variable access.
// RULE: Components and hooks NEVER access process.env directly — they import from here.

export const AppConfig = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  worldName: process.env.NEXT_PUBLIC_WORLD_NAME ?? "The Developer's Voyage",
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID ?? '',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;
