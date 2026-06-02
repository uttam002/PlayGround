export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isValidRemoteName(name: string): boolean {
  return /^[a-zA-Z0-9._-]+$/.test(name);
}

export function isValidBranchName(name: string): boolean {
  if (!name.trim()) return false;
  if (name.startsWith("-")) return false;
  if (name.includes("..")) return false;
  if (/[\s~^:?*\\]/.test(name)) return false;
  return true;
}

export function shellQuote(arg: string): string {
  if (/^[a-zA-Z0-9_./:@-]+$/.test(arg)) return arg;
  return `"${arg.replace(/"/g, '\\"')}"`;
}
