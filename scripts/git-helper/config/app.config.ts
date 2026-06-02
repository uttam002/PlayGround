/** Application configuration and future AI extension hooks. */
export const APP_CONFIG = {
  name: "Git Command Assistant",
  version: "1.0.0",
  /** Reserved CLI subcommands for future AI integration */
  aiCommands: ["doctor", "explain", "learn", "fix"] as const,
} as const;

export type AiCommand = (typeof APP_CONFIG.aiCommands)[number];
