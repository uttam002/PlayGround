import { runOperation } from "../services/operation.service";
import * as git from "../services/git.service";
import { inputText } from "../utils/prompt.utils";
import { shellQuote } from "../utils/validation.utils";

export async function fetchRemote(): Promise<void> {
  const remote = await inputText("Remote (optional, Enter for all):");
  const cmd = remote ? `git fetch ${shellQuote(remote)}` : "git fetch --all --prune";
  await runOperation({ title: "Fetch", getCommand: () => cmd, learnId: "git.fetch" });
}

export async function pullChanges(): Promise<void> {
  await runOperation({ title: "Pull", getCommand: () => "git pull", learnId: "git.pull" });
}

export async function pushChanges(): Promise<void> {
  await runOperation({ title: "Push", getCommand: () => "git push", learnId: "git.push" });
}

export async function forcePush(): Promise<void> {
  const remote = await inputText("Remote:", "origin");
  const branch = (await git.getCurrentBranch()) ?? "HEAD";
  const cmd = `git push --force ${shellQuote(remote)} ${shellQuote(branch)}`;
  await runOperation({
    title: "Force Push",
    getCommand: () => cmd,
    learnId: "git.push.force",
    dangerous: true,
    warningMessage: "Overwrites remote history. Coordinate with your team.",
  });
}

export async function forcePushWithLease(): Promise<void> {
  const remote = await inputText("Remote:", "origin");
  const branch = (await git.getCurrentBranch()) ?? "HEAD";
  const cmd = `git push --force-with-lease ${shellQuote(remote)} ${shellQuote(branch)}`;
  await runOperation({
    title: "Force Push With Lease",
    getCommand: () => cmd,
    learnId: "git.push.force",
    dangerous: true,
  });
}

export async function setupUpstream(): Promise<void> {
  const remote = await inputText("Remote:", "origin");
  const branch = (await git.getCurrentBranch())?.replace(/^\(detached.*\)$/, "") ?? await inputText("Branch:");
  const cmd = `git push -u ${shellQuote(remote)} ${shellQuote(branch)}`;
  await runOperation({ title: "Upstream Setup", getCommand: () => cmd, learnId: "git.push" });
}
