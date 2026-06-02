declare module "inquirer" {
  import type { Answers, QuestionCollection } from "inquirer";
  const inquirer: {
    prompt<T extends Answers>(questions: QuestionCollection<T>): Promise<T>;
    Separator: new (line?: string) => unknown;
  };
  export default inquirer;
  export type { Answers, QuestionCollection };
  export class Separator {
    constructor(line?: string);
  }
}
