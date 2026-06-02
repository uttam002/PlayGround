import { BACK, showMenu } from "../utils/menu.utils";
import * as commit from "../commands/commit.commands";

export async function commitMenu(): Promise<void> {
  const choice = await showMenu("Commit Management", [
    "Create Commit",
    "Amend Commit",
    "Edit Message",
    "View Commit",
    "Search Commit",
    "Squash Commits",
    "Split Commit",
    BACK,
  ]);

  const handlers: Record<string, () => Promise<void>> = {
    "Create Commit": commit.createCommit,
    "Amend Commit": commit.amendCommit,
    "Edit Message": commit.editCommitMessage,
    "View Commit": commit.viewCommitLog,
    "Search Commit": commit.searchCommit,
    "Squash Commits": commit.squashCommitsGuide,
    "Split Commit": commit.splitCommitGuide,
  };

  const handler = handlers[choice];
  if (handler) await handler();
}
