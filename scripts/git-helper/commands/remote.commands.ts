import inquirer from "inquirer";
import { run } from "../services/shell.service";

export async function showRemotes() {
  console.log(await run("git remote -v"));
}

export async function addRemote() {
  const answers = await inquirer.prompt([
    { type: "input", name: "name", message: "Remote name:" },
    { type: "input", name: "url", message: "Remote URL:" }
  ]);

  console.log(await run(`git remote add ${answers.name} ${answers.url}`));
}