import inquirer from "inquirer";
import { run } from "../services/shell.service";

export async function createBranch() {
  const { name } = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Branch name:"
  });

  console.log(await run(`git switch -c ${name}`));
}

export async function switchBranch() {
  const { name } = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Branch name:"
  });

  console.log(await run(`git switch ${name}`));
}