/** Patterns that trigger the safety confirmation layer. */
export const DANGEROUS_PATTERNS: RegExp[] = [
  /\bgit\s+reset\s+--hard\b/i,
  /\bgit\s+clean\s+-f/i,
  /\bgit\s+push\s+--force\b/i,
  /\bgit\s+push\s+-f\b/i,
  /\bgit\s+branch\s+-D\b/i,
  /\bgit\s+stash\s+drop\b/i,
  /\bgit\s+stash\s+clear\b/i,
  /\bgit\s+tag\s+-d\b/i,
  /\bgit\s+remote\s+remove\b/i,
];

export function isDangerousCommand(command: string): boolean {
  return DANGEROUS_PATTERNS.some((p) => p.test(command));
}
