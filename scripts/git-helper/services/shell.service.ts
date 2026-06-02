import { execa } from "execa";

export async function run(command: string) {
  const result = await execa(command, { shell: true });
  return result.stdout;
}