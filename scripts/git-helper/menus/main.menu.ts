import { APP_CONFIG } from "../config/app.config";
import { colors } from "../utils/colors";
import { EXIT, showMenu } from "../utils/menu.utils";
import { repoMenu } from "./repo.menu";
import { branchMenu } from "./branch.menu";
import { commitMenu } from "./commit.menu";
import { remoteMenu } from "./remote.menu";
import { syncMenu } from "./sync.menu";
import { mergeMenu } from "./merge.menu";
import { rebaseMenu } from "./rebase.menu";
import { cherryPickMenu } from "./cherry-pick.menu";
import { stashMenu } from "./stash.menu";
import { tagMenu } from "./tag.menu";
import { recoveryMenu } from "./recovery.menu";
import { githubMenu } from "./github.menu";
import { troubleshootMenu } from "./troubleshoot.menu";
import { doctorMenu } from "./doctor.menu";
import { showLearn } from "../services/learn.service";
import { LEARN_REGISTRY } from "../constants/learn-registry";
import { inputText } from "../utils/prompt.utils";
import { pause } from "../utils/menu.utils";

const CATEGORIES: Array<{ label: string; run: () => Promise<void> }> = [
  { label: "Repository Management", run: repoMenu },
  { label: "Branch Management", run: branchMenu },
  { label: "Commit Management", run: commitMenu },
  { label: "Remote Management", run: remoteMenu },
  { label: "Sync Operations", run: syncMenu },
  { label: "Merge Operations", run: mergeMenu },
  { label: "Rebase Operations", run: rebaseMenu },
  { label: "Cherry Pick Operations", run: cherryPickMenu },
  { label: "Stash Operations", run: stashMenu },
  { label: "Tag Management", run: tagMenu },
  { label: "Recovery Operations", run: recoveryMenu },
  { label: "GitHub Operations", run: githubMenu },
  { label: "Troubleshooting", run: troubleshootMenu },
  { label: "Repository Doctor", run: doctorMenu },
];

function printBanner(): void {
  console.clear();
  console.log(colors.bold(colors.highlight(`\n  ${APP_CONFIG.name}  v${APP_CONFIG.version}\n`)));
  console.log(colors.muted("  Navigate Git safely — Execute · Preview · Learn\n"));
}

export async function mainMenu(): Promise<void> {
  while (true) {
    printBanner();
    const choice = await showMenu("Main Menu", [
      ...CATEGORIES.map((c) => c.label),
      "Git Encyclopedia (Learn)",
      EXIT,
    ]);

    if (choice === EXIT) {
      console.log(colors.success("\nFair winds. Happy shipping.\n"));
      process.exit(0);
    }

    if (choice === "Git Encyclopedia (Learn)") {
      await encyclopediaPrompt();
      continue;
    }

    const category = CATEGORIES.find((c) => c.label === choice);
    if (category) {
      try {
        await category.run();
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.log(colors.error(`\n${msg}\n`));
        await pause();
      }
    }
  }
}

async function encyclopediaPrompt(): Promise<void> {
  const topic = await inputText(
    "Learn topic id (e.g. git.rebase, git.push) or press Enter to browse keys:",
  );
  if (!topic) {
    console.log(colors.info("\nAvailable topics:\n"));
    console.log(Object.keys(LEARN_REGISTRY).join("\n"));
    await pause();
    return;
  }
  showLearn(topic);
  await pause();
}

/** Future AI hook: non-interactive learn by topic id */
export async function runLearnCommand(topic: string): Promise<void> {
  showLearn(topic);
}
