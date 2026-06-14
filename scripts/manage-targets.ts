import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

// File Paths
const JSON_PATH = path.join(process.cwd(), 'docs/targets/dashboard/targets.json');
const MD_PATH = path.join(process.cwd(), 'docs/targets/dashboard/DASHBOARD.md');

interface Target {
  id: string;
  name: string;
  status: 'Todo' | 'In Progress' | 'Completed' | 'Blocked';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  branch: string;
  lastUpdated: string;
  fileName: string;
}

interface TargetData {
  [phaseKey: string]: Target[];
}

// Status & Priority Emojis for Visual Markdown
const STATUS_EMOJIS = {
  'Todo': '⚪ Todo',
  'In Progress': '🟡 In Progress',
  'Completed': '🟢 Completed',
  'Blocked': '🔴 Blocked'
};

const PRIORITY_EMOJIS = {
  'Critical': '🔴 Critical',
  'High': '🟠 High',
  'Medium': '🟡 Medium',
  'Low': '🟢 Low'
};

// Generate Progress Bar
function getProgressBar(completed: number, total: number): string {
  const size = 20;
  const filled = Math.max(0, Math.min(size, Math.round((completed / total) * size)));
  const empty = size - filled;
  return '`[' + '█'.repeat(filled) + '░'.repeat(empty) + ']`';
}

// Format Date to YYYY-MM-DD
function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Generate DASHBOARD.md Content
function generateDashboard(data: TargetData): string {
  // Use relative paths from dashboard/ to phase-1/ for clean, platform-independent link parsing
  const targetsPath = '../phase-1';

  // Find current active target
  let activeTarget: Target | null = null;
  for (const phase of Object.values(data)) {
    const active = phase.find(t => t.status === 'In Progress' || t.status === 'Todo');
    if (active) {
      activeTarget = active;
      break;
    }
  }

  let mdContent = `# ⛵ The Developer's Voyage — Command Center

This dashboard tracks the status of all development targets in **The Developer's Voyage** project.

> [!TIP]
> **To change target statuses interactively**, run **\`npm run targets\`** or **\`pnpm targets\`** in your terminal. This file will be updated automatically.

---

`;

  if (activeTarget) {
    mdContent += `## 🎯 Current Target Objective
> [!IMPORTANT]
> We are currently focusing on **${activeTarget.id}: ${activeTarget.name}** (\`${activeTarget.branch}\`).
> Click here to view requirements: [${activeTarget.id} Requirements](${targetsPath}/${activeTarget.fileName})

---

`;
  }

  // Process each phase
  Object.keys(data).forEach((phaseKey) => {
    const targets = data[phaseKey];
    const total = targets.length;
    const completed = targets.filter(t => t.status === 'Completed').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const progressBar = getProgressBar(completed, total);

    const phaseTitle = phaseKey.replace(/(\d+)/g, ' $1').replace(/^\w/, c => c.toUpperCase()); // "phase1" -> "Phase 1"

    mdContent += `## 📊 ${phaseTitle} Progress

${progressBar} \`${completed} / ${total} Targets Completed (${percentage}%)\`

| Target ID | Task Name | Status | Priority | Active Branch | Last Updated |
| :---: | :--- | :---: | :---: | :---: | :---: |
`;

    targets.forEach((target) => {
      const statusStr = STATUS_EMOJIS[target.status] || target.status;
      const priorityStr = PRIORITY_EMOJIS[target.priority] || target.priority;
      const targetLink = `[**${target.id}**](${targetsPath}/${target.fileName})`;
      
      mdContent += `| ${targetLink} | ${target.name} | ${statusStr} | ${priorityStr} | \`${target.branch}\` | *${target.lastUpdated}* |\n`;
    });

    mdContent += '\n';
  });

  return mdContent;
}

// Main CLI App
async function main() {
  console.log('\n🚢 \x1b[36m\x1b[1mThe Developer\'s Voyage — Target Dashboard Manager\x1b[0m\n');

  if (!fs.existsSync(JSON_PATH)) {
    console.error(`\x1b[31mError: Database file not found at: ${JSON_PATH}\x1b[0m`);
    process.exit(1);
  }

  // Pre-generate markdown dashboard non-interactively if flag is passed
  if (process.argv.includes('--generate') || process.argv.includes('-g')) {
    const data: TargetData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
    const markdownContent = generateDashboard(data);
    fs.writeFileSync(MD_PATH, markdownContent, 'utf-8');
    console.log(`\x1b[32m✔ Target Dashboard file generated successfully at: ${MD_PATH}\x1b[0m\n`);
    return;
  }

  // Load current target data
  const data: TargetData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  // Prompt: Select Phase
  const phases = Object.keys(data);
  let selectedPhase = phases[0];

  if (phases.length > 1) {
    const phaseAnswer = await inquirer.prompt<{ phase: string }>([
      {
        type: 'list',
        name: 'phase',
        message: 'Select the phase to manage:',
        choices: phases.map(p => ({
          name: p.replace(/(\d+)/g, ' $1').replace(/^\w/, c => c.toUpperCase()),
          value: p
        }))
      }
    ]);
    selectedPhase = phaseAnswer.phase;
  }

  const targets = data[selectedPhase];

  // Prompt: Select Target
  const targetChoices = targets.map(t => ({
    name: `${t.id}: ${t.name} (${STATUS_EMOJIS[t.status] || t.status})`,
    value: t.id
  }));

  const { targetId } = await inquirer.prompt<{ targetId: string }>([
    {
      type: 'list',
      name: 'targetId',
      message: 'Select a target to update:',
      choices: [...targetChoices, { name: '❌ Cancel & Exit', value: 'exit' }]
    }
  ]);

  if (targetId === 'exit') {
    console.log('\x1b[33mExited without making changes.\x1b[0m\n');
    return;
  }

  const targetIndex = targets.findIndex(t => t.id === targetId);
  const target = targets[targetIndex];

  // Prompt: Select New Status
  const { newStatus } = await inquirer.prompt<{ newStatus: Target['status'] }>([
    {
      type: 'list',
      name: 'newStatus',
      message: `Select new status for "${target.name}":`,
      choices: Object.keys(STATUS_EMOJIS) as Target['status'][],
      default: target.status
    }
  ]);

  // Update target properties
  target.status = newStatus;
  target.lastUpdated = getTodayDateString();

  // Write changes back to targets.json
  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`\n\x1b[32m✔ Updated ${target.id} status to: ${STATUS_EMOJIS[newStatus] || newStatus}\x1b[0m`);

  // Regenerate DASHBOARD.md
  const markdownContent = generateDashboard(data);
  fs.writeFileSync(MD_PATH, markdownContent, 'utf-8');
  console.log(`\x1b[32m✔ Regenerated Dashboard file at: ${MD_PATH}\x1b[0m\n`);
}

main().catch(err => {
  console.error('\x1b[31mUnexpected CLI error:\x1b[0m', err);
  process.exit(1);
});
