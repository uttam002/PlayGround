import { execa, type ExecaError } from "execa";
import { translateGitError } from "./error-translator.service";
import { colors, iconErr } from "../utils/colors";

export interface RunResult {
  ok: boolean;
  stdout: string;
  stderr: string;
  exitCode: number;
}

export async function run(
  command: string,
  options?: { cwd?: string; allowFailure?: boolean },
): Promise<RunResult> {
  try {
    const result = await execa(command, {
      shell: true,
      cwd: options?.cwd,
      reject: false,
      all: true,
    });
    const combined = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    const ok = result.exitCode === 0;
    if (!ok && !options?.allowFailure) {
      printFriendlyError(combined || result.stderr || "Command failed.");
    }
    return {
      ok,
      stdout: (result.stdout ?? "").trim(),
      stderr: (result.stderr ?? "").trim(),
      exitCode: result.exitCode ?? 1,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!options?.allowFailure) {
      printFriendlyError(message);
    }
    return { ok: false, stdout: "", stderr: message, exitCode: 1 };
  }
}

export async function runOrThrow(command: string, cwd?: string): Promise<string> {
  const result = await run(command, { cwd });
  if (!result.ok) {
    throw new Error(result.stderr || result.stdout || "Command failed");
  }
  return result.stdout;
}

function printFriendlyError(raw: string): void {
  const translated = translateGitError(raw);
  console.log("");
  console.log(iconErr(colors.bold(translated.title)));
  console.log(colors.muted(translated.explanation));
  if (translated.suggestions.length) {
    console.log(colors.info("\nSuggestions:"));
    translated.suggestions.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  }
  console.log(colors.dim(`\nTechnical: ${raw.split("\n")[0]}`));
  console.log("");
}

export function isExecaError(err: unknown): err is ExecaError {
  return typeof err === "object" && err !== null && "exitCode" in err;
}
