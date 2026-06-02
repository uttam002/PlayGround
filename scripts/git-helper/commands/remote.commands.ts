import { runOperation } from "../services/operation.service";
import { run } from "../services/shell.service";
import * as git from "../services/git.service";
import { inputText } from "../utils/prompt.utils";
import { isValidRemoteName, shellQuote } from "../utils/validation.utils";
import { colors } from "../utils/colors";
import { pause } from "../utils/menu.utils";

export async function showRemotes(): Promise<void> {
  await runOperation({
    title: "Show Remotes",
    getCommand: () => "git remote -v",
    learnId: "git.remote.add",
  });
}

export async function addRemote(): Promise<void> {
  const name = await inputText("Remote name:", "origin");
  const url = await inputText("Remote URL:");
  if (!isValidRemoteName(name)) throw new Error("Invalid remote name");
  const cmd = `git remote add ${shellQuote(name)} ${shellQuote(url)}`;
  await runOperation({ title: "Add Remote", getCommand: () => cmd, learnId: "git.remote.add" });
}

export async function removeRemote(): Promise<void> {
  const remotes = await git.listRemotes();
  const name = await inputText(`Remote to remove${remotes.length ? ` (${remotes.join(", ")})` : ""}:`);
  const cmd = `git remote remove ${shellQuote(name)}`;
  await runOperation({
    title: "Remove Remote",
    getCommand: () => cmd,
    learnId: "git.remote.add",
    dangerous: true,
  });
}

export async function updateRemoteUrl(): Promise<void> {
  const name = await inputText("Remote name:", "origin");
  const url = await inputText("New URL:");
  const cmd = `git remote set-url ${shellQuote(name)} ${shellQuote(url)}`;
  await runOperation({ title: "Update Remote URL", getCommand: () => cmd, learnId: "git.remote.add" });
}

export async function verifyRemote(): Promise<void> {
  const name = await inputText("Remote to verify:", "origin");
  await runOperation({
    title: "Verify Remote",
    getCommand: () => `git ls-remote ${shellQuote(name)}`,
    learnId: "git.remote.add",
  });
}

export async function repositoryNotFoundFix(): Promise<void> {
  console.log(colors.info("\nChecking remotes and connectivity...\n"));
  console.log(await git.getRemoteVerbose());
  const r = await run("git ls-remote origin", { allowFailure: true });
  if (!r.ok) {
    console.log(colors.warning("Cannot reach origin. Update URL or authenticate."));
  }
  await pause();
}

export async function changeRepository(): Promise<void> {
  const path = await inputText("Path to another repository:");
  process.chdir(path);
  console.log(colors.success(`Working directory: ${process.cwd()}`));
  await pause();
}
