import { LEARN_REGISTRY, type LearnContent } from "../constants/learn-registry";
import { colors } from "../utils/colors";

export function getLearnContent(learnId: string): LearnContent | undefined {
  return LEARN_REGISTRY[learnId];
}

export function showLearn(learnId: string): void {
  const content = getLearnContent(learnId);
  if (!content) {
    console.log(colors.warning(`No learning content for: ${learnId}`));
    return;
  }
  console.log("");
  console.log(colors.bold(colors.highlight("What does this command do?")));
  console.log(colors.info("\nPurpose:"));
  console.log(`  ${content.purpose}`);
  console.log(colors.info("\nSyntax:"));
  console.log(`  ${content.syntax}`);
  console.log(colors.info("\nExamples:"));
  content.examples.forEach((e) => console.log(`  ${e}`));
  if (content.risks.length) {
    console.log(colors.warning("\nRisks:"));
    content.risks.forEach((r) => console.log(`  • ${r}`));
  }
  console.log(colors.success("\nBest practices:"));
  content.bestPractices.forEach((b) => console.log(`  • ${b}`));
  console.log("");
}
