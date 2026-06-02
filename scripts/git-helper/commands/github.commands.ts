import { runOperation } from "../services/operation.service";
import { run } from "../services/shell.service";
import { getGhAuthStatus, isGhInstalled } from "../services/github.service";
import { inputText } from "../utils/prompt.utils";
import { shellQuote } from "../utils/validation.utils";
import { colors } from "../utils/colors";
import { pause } from "../utils/menu.utils";

async function requireGh(): Promise<boolean> {
  if (!(await isGhInstalled())) {
    console.log(colors.error("GitHub CLI (gh) is not installed. Install from https://cli.github.com"));
    await pause();
    return false;
  }
  return true;
}

export async function githubLogin(): Promise<void> {
  if (!(await requireGh())) return;
  await runOperation({
    title: "GitHub Login",
    getCommand: () => "gh auth login",
    learnId: "gh.auth.login",
    execute: async () => {
      console.log(colors.info("Launching interactive gh auth login..."));
      await run("gh auth login");
    },
  });
}

export async function githubStatus(): Promise<void> {
  if (!(await requireGh())) return;
  console.log(await getGhAuthStatus());
  await pause();
}

export async function createGithubRepo(): Promise<void> {
  if (!(await requireGh())) return;
  const name = await inputText("Repository name:");
  const visibility = await inputText("Visibility: public | private", "private");
  const cmd = `gh repo create ${shellQuote(name)} --${visibility} --source=. --remote=origin`;
  await runOperation({ title: "Create GitHub Repository", getCommand: () => cmd, learnId: "gh.auth.login" });
}

export async function openGithubRepo(): Promise<void> {
  if (!(await requireGh())) return;
  await runOperation({
    title: "Open Repository in Browser",
    getCommand: () => "gh repo view --web",
    learnId: "gh.auth.login",
    execute: async () => {
      await run("gh repo view --web");
    },
  });
}

export async function cloneGithubRepo(): Promise<void> {
  if (!(await requireGh())) return;
  const slug = await inputText("owner/repo:");
  await runOperation({
    title: "Clone GitHub Repository",
    getCommand: () => `gh repo clone ${shellQuote(slug)}`,
    learnId: "git.clone",
  });
}

export async function createPullRequest(): Promise<void> {
  if (!(await requireGh())) return;
  await runOperation({
    title: "Create Pull Request",
    getCommand: () => "gh pr create --fill",
    learnId: "gh.pr.create",
  });
}

export async function viewPullRequests(): Promise<void> {
  if (!(await requireGh())) return;
  await runOperation({
    title: "View Pull Requests",
    getCommand: () => "gh pr list",
    learnId: "gh.pr.create",
  });
}

export async function mergePullRequest(): Promise<void> {
  if (!(await requireGh())) return;
  const number = await inputText("PR number:");
  await runOperation({
    title: "Merge Pull Request",
    getCommand: () => `gh pr merge ${number} --merge`,
    learnId: "gh.pr.create",
  });
}
