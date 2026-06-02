import { run } from "./shell.service";

export async function isGhInstalled(): Promise<boolean> {
  const r = await run("gh --version", { allowFailure: true });
  return r.ok;
}

export async function isGhAuthenticated(): Promise<boolean> {
  const r = await run("gh auth status", { allowFailure: true });
  return r.ok;
}

export async function getGhAuthStatus(): Promise<string> {
  const r = await run("gh auth status", { allowFailure: true });
  return r.ok ? r.stdout : r.stderr;
}
