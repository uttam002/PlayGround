import { BACK, showMenu } from "../utils/menu.utils";
import { getTroubleshootIssues, runTroubleshootIssue, diagnoseLastError } from "../commands/troubleshoot.commands";

export async function troubleshootMenu(): Promise<void> {
  const issues = getTroubleshootIssues();
  const choice = await showMenu("Troubleshooting", [
    ...issues.map((i) => i.title),
    "Diagnose Error Message",
    BACK,
  ]);

  if (choice === BACK) return;
  if (choice === "Diagnose Error Message") {
    await diagnoseLastError();
    return;
  }

  const issue = issues.find((i) => i.title === choice);
  if (issue) await runTroubleshootIssue(issue.id);
}
