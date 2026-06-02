import { ERROR_PATTERNS, type TranslatedError } from "../constants/error-patterns";

const FALLBACK: TranslatedError = {
  title: "Git command failed",
  explanation: "An unexpected error occurred while running Git.",
  suggestions: [
    "Read the technical message below",
    "Run Repository Doctor for environment checks",
    "Try the operation again after fixing the reported issue",
  ],
};

export function translateGitError(raw: string): TranslatedError {
  for (const { pattern, translate } of ERROR_PATTERNS) {
    const match = raw.match(pattern);
    if (match) return translate(match);
  }
  return { ...FALLBACK, explanation: raw.split("\n").slice(0, 3).join(" ") || FALLBACK.explanation };
}
