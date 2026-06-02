import { APP_CONFIG, type AiCommand } from "./config/app.config";
import { mainMenu, runLearnCommand } from "./menus/main.menu";
import { colors } from "./utils/colors";
import { printHealthReport, runHealthChecks } from "./services/doctor.service";
import { translateGitError } from "./services/error-translator.service";
import { troubleshootMenu } from "./menus/troubleshoot.menu";

const args = process.argv.slice(2);
const subcommand = args[0] as AiCommand | undefined;

async function runCliExtension(cmd: AiCommand): Promise<void> {
  switch (cmd) {
    case "doctor": {
      const report = await runHealthChecks();
      printHealthReport(report);
      break;
    }
    case "learn": {
      const topic = args[1];
      if (!topic) {
        console.log(colors.warning(`Usage: npm run git-helper -- learn <topic-id>`));
        process.exit(1);
      }
      await runLearnCommand(topic);
      break;
    }
    case "explain": {
      const text = args.slice(1).join(" ");
      if (!text) {
        console.log(colors.warning(`Usage: npm run git-helper -- explain <error text>`));
        process.exit(1);
      }
      const t = translateGitError(text);
      console.log(colors.bold(t.title));
      console.log(t.explanation);
      t.suggestions.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
      break;
    }
    case "fix": {
      console.log(colors.info(`${APP_CONFIG.name}: interactive fix — opening Troubleshooting...\n`));
      await troubleshootMenu();
      break;
    }
    default:
      break;
  }
}

(async () => {
  try {
    if (subcommand && (APP_CONFIG.aiCommands as readonly string[]).includes(subcommand)) {
      if (subcommand === "fix") {
        await troubleshootMenu();
        return;
      }
      await runCliExtension(subcommand);
      return;
    }
    await mainMenu();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(colors.error(`\nUnexpected error: ${msg}\n`));
    process.exit(1);
  }
})();
