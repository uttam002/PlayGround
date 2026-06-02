import {
  getCurrentBranch,
  getGitVersion,
  getUpstream,
  hasUncommittedChanges,
  isDetachedHead,
  isGitInstalled,
  isGitRepository,
  isMergeInProgress,
  isRebaseInProgress,
  listRemotes,
} from "./git.service";
import { isGhAuthenticated, isGhInstalled } from "./github.service";
import { colors, iconErr, iconOk, iconWarn } from "../utils/colors";

export type HealthStatus = "ok" | "warn" | "fail";

export interface HealthCheck {
  label: string;
  status: HealthStatus;
  detail?: string;
}

export interface HealthReport {
  checks: HealthCheck[];
  recommendations: string[];
}

export async function runHealthChecks(): Promise<HealthReport> {
  const checks: HealthCheck[] = [];
  const recommendations: string[] = [];

  const gitOk = await isGitInstalled();
  checks.push({
    label: "Git Installed",
    status: gitOk ? "ok" : "fail",
    detail: gitOk ? (await getGitVersion()) ?? undefined : "Install Git from https://git-scm.com",
  });

  if (gitOk) {
    const version = await getGitVersion();
    checks.push({ label: "Git Version", status: "ok", detail: version ?? undefined });
  }

  const ghInstalled = await isGhInstalled();
  checks.push({
    label: "GitHub CLI Installed",
    status: ghInstalled ? "ok" : "warn",
    detail: ghInstalled ? undefined : "Optional: install gh for GitHub features",
  });

  if (ghInstalled) {
    const authed = await isGhAuthenticated();
    checks.push({
      label: "GitHub Authenticated",
      status: authed ? "ok" : "warn",
      detail: authed ? undefined : "Run GitHub Login",
    });
    if (!authed) recommendations.push("GitHub Login (gh auth login)");
  }

  const inRepo = await isGitRepository();
  checks.push({
    label: "Inside Git Repository",
    status: inRepo ? "ok" : "warn",
    detail: inRepo ? undefined : "Initialize or clone a repository",
  });

  if (!inRepo) {
    return { checks, recommendations };
  }

  const branch = await getCurrentBranch();
  checks.push({
    label: "Current Branch",
    status: branch && !branch.startsWith("(detached") ? "ok" : "warn",
    detail: branch ?? "unknown",
  });

  if (await isDetachedHead()) {
    checks.push({ label: "Detached HEAD", status: "warn", detail: "Not on a branch" });
    recommendations.push("Fix Detached HEAD (Recovery menu)");
  } else {
    checks.push({ label: "Detached HEAD", status: "ok" });
  }

  const remotes = await listRemotes();
  checks.push({
    label: "Remote Configured",
    status: remotes.length > 0 ? "ok" : "warn",
    detail: remotes.length ? remotes.join(", ") : "No remotes",
  });
  if (!remotes.length) recommendations.push("Add remote (Remote Management)");

  const upstream = await getUpstream();
  checks.push({
    label: "Upstream Tracking",
    status: upstream ? "ok" : "warn",
    detail: upstream ?? "No upstream for current branch",
  });
  if (!upstream) recommendations.push("Configure upstream (Sync → Upstream Setup)");

  const dirty = await hasUncommittedChanges();
  checks.push({
    label: "Working Tree Clean",
    status: dirty ? "warn" : "ok",
    detail: dirty ? "Uncommitted changes present" : undefined,
  });
  if (dirty) recommendations.push("Commit or stash changes");

  if (await isMergeInProgress()) {
    checks.push({ label: "Merge State", status: "warn", detail: "Merge in progress" });
    recommendations.push("Complete or abort merge");
  } else {
    checks.push({ label: "Merge State", status: "ok" });
  }

  if (await isRebaseInProgress()) {
    checks.push({ label: "Rebase State", status: "warn", detail: "Rebase in progress" });
    recommendations.push("Continue or abort rebase");
  } else {
    checks.push({ label: "Rebase State", status: "ok" });
  }

  return { checks, recommendations };
}

export function printHealthReport(report: HealthReport): void {
  console.log("");
  console.log(colors.bold(colors.highlight("Git Health Report")));
  console.log("");

  for (const c of report.checks) {
    const line =
      c.status === "ok"
        ? iconOk(c.label)
        : c.status === "warn"
          ? iconWarn(c.label)
          : iconErr(c.label);
    console.log(line + (c.detail ? colors.dim(` — ${c.detail}`) : ""));
  }

  if (report.recommendations.length) {
    console.log(colors.info("\nRecommended fixes:"));
    report.recommendations.forEach((r, i) => console.log(`  ${i + 1}. ${r}`));
  } else {
    console.log(colors.success("\nRepository looks healthy."));
  }
  console.log("");
}
