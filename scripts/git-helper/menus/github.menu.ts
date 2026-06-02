import { BACK, showMenu } from "../utils/menu.utils";
import * as github from "../commands/github.commands";

export async function githubMenu(): Promise<void> {
  const choice = await showMenu("GitHub Operations", [
    "GitHub Login",
    "GitHub Status",
    "Create Repository",
    "Open Repository",
    "Clone Repository",
    "Create Pull Request",
    "View Pull Requests",
    "Merge Pull Request",
    BACK,
  ]);

  const handlers: Record<string, () => Promise<void>> = {
    "GitHub Login": github.githubLogin,
    "GitHub Status": github.githubStatus,
    "Create Repository": github.createGithubRepo,
    "Open Repository": github.openGithubRepo,
    "Clone Repository": github.cloneGithubRepo,
    "Create Pull Request": github.createPullRequest,
    "View Pull Requests": github.viewPullRequests,
    "Merge Pull Request": github.mergePullRequest,
  };

  const handler = handlers[choice];
  if (handler) await handler();
}
