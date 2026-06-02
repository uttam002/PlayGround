import { runOperation } from "../services/operation.service";
import { run } from "../services/shell.service";
import * as git from "../services/git.service";
import { printHealthReport, runHealthChecks } from "../services/doctor.service";
import { inputText } from "../utils/prompt.utils";
import { shellQuote } from "../utils/validation.utils";
import { colors } from "../utils/colors";
import { pause } from "../utils/menu.utils";

export async function initRepository(): Promise<void> {
  const branch = await inputText("Default branch name (optional, e.g. main):", "main");
  const cmd = branch ? `git init -b ${shellQuote(branch)}` : "git init";
  await runOperation({
    title: "Initialize Repository",
    getCommand: () => cmd,
    learnId: "git.init",
  });
}

export async function cloneRepository(): Promise<void> {
  const url = await inputText("Repository URL:");
  const dir = await inputText("Target directory (optional):");
  const cmd = dir ? `git clone ${shellQuote(url)} ${shellQuote(dir)}` : `git clone ${shellQuote(url)}`;
  await runOperation({ title: "Clone Repository", getCommand: () => cmd, learnId: "git.clone" });
}

export async function showRepositoryInfo(): Promise<void> {
  const root = await git.getRepoRoot();
  const branch = await git.getCurrentBranch();
  const remotes = await git.getRemoteVerbose();
  console.log(colors.bold("\nRepository Information\n"));
  console.log(`Root:    ${root ?? "N/A"}`);
  console.log(`Branch:  ${branch ?? "N/A"}`);
  console.log(`Remotes:\n${remotes || "  (none)"}\n`);
  await pause();
}

export async function repositoryStatus(): Promise<void> {
  await runOperation({
    title: "Repository Status",
    getCommand: () => "git status",
    learnId: "git.status",
  });
}

export async function repositoryHealth(): Promise<void> {
  const report = await runHealthChecks();
  printHealthReport(report);
  await pause();
}

export async function repositoryStatistics(): Promise<void> {
  const stats = await git.countObjects();
  const branches = await git.listBranches();
  console.log(colors.bold("\nRepository Statistics\n"));
  console.log(stats || "Unable to read object stats.");
  console.log(`\nLocal branches: ${branches.length}`);
  await pause();
}

export async function archiveRepository(): Promise<void> {
  const ref = await inputText("Tag or commit to archive:", "HEAD");
  const file = await inputText("Output file:", "repo-archive.zip");
  const cmd = `git archive --format=zip -o ${shellQuote(file)} ${shellQuote(ref)}`;
  await runOperation({ title: "Archive Repository", getCommand: () => cmd, learnId: "git.status" });
}
