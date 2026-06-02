import { run } from "./shell.service";

export async function isGitInstalled(): Promise<boolean> {
  const r = await run("git --version", { allowFailure: true });
  return r.ok;
}

export async function getGitVersion(): Promise<string | null> {
  const r = await run("git --version", { allowFailure: true });
  return r.ok ? r.stdout : null;
}

export async function isGitRepository(cwd?: string): Promise<boolean> {
  const r = await run("git rev-parse --is-inside-work-tree", { cwd, allowFailure: true });
  return r.ok && r.stdout === "true";
}

export async function getCurrentBranch(cwd?: string): Promise<string | null> {
  const r = await run("git branch --show-current", { cwd, allowFailure: true });
  if (r.ok && r.stdout) return r.stdout;
  const detached = await run("git rev-parse --short HEAD", { cwd, allowFailure: true });
  if (detached.ok) return `(detached @ ${detached.stdout})`;
  return null;
}

export async function isDetachedHead(cwd?: string): Promise<boolean> {
  const r = await run("git symbolic-ref -q HEAD", { cwd, allowFailure: true });
  return !r.ok;
}

export async function hasUncommittedChanges(cwd?: string): Promise<boolean> {
  const r = await run("git status --porcelain", { cwd, allowFailure: true });
  return r.ok && r.stdout.length > 0;
}

export async function listBranches(cwd?: string): Promise<string[]> {
  const r = await run("git branch --format=%(refname:short)", { cwd, allowFailure: true });
  if (!r.ok) return [];
  return r.stdout.split("\n").map((b) => b.trim()).filter(Boolean);
}

export async function listRemotes(cwd?: string): Promise<string[]> {
  const r = await run("git remote", { cwd, allowFailure: true });
  if (!r.ok) return [];
  return r.stdout.split("\n").map((x) => x.trim()).filter(Boolean);
}

export async function hasUpstream(cwd?: string): Promise<boolean> {
  const r = await run("git rev-parse --abbrev-ref @{upstream}", { cwd, allowFailure: true });
  return r.ok;
}

export async function getUpstream(cwd?: string): Promise<string | null> {
  const r = await run("git rev-parse --abbrev-ref @{upstream}", { cwd, allowFailure: true });
  return r.ok ? r.stdout : null;
}

export async function isMergeInProgress(cwd?: string): Promise<boolean> {
  const r = await run("git rev-parse -q --verify MERGE_HEAD", { cwd, allowFailure: true });
  return r.ok;
}

export async function isRebaseInProgress(cwd?: string): Promise<boolean> {
  const r = await run("git status", { cwd, allowFailure: true });
  return r.ok && /rebase in progress/i.test(r.stdout);
}

export async function getReflog(limit = 20, cwd?: string): Promise<string> {
  const r = await run(`git reflog -n ${limit}`, { cwd, allowFailure: true });
  return r.ok ? r.stdout : "";
}

export async function getStatus(cwd?: string): Promise<string> {
  const r = await run("git status", { cwd, allowFailure: true });
  return r.ok ? r.stdout : r.stderr;
}

export async function getRemoteVerbose(cwd?: string): Promise<string> {
  const r = await run("git remote -v", { cwd, allowFailure: true });
  return r.ok ? r.stdout : "";
}

export async function countObjects(cwd?: string): Promise<string> {
  const r = await run("git count-objects -vH", { cwd, allowFailure: true });
  return r.ok ? r.stdout : "";
}

export async function getRepoRoot(cwd?: string): Promise<string | null> {
  const r = await run("git rev-parse --show-toplevel", { cwd, allowFailure: true });
  return r.ok ? r.stdout : null;
}
