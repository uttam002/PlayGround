export interface LearnContent {
  purpose: string;
  syntax: string;
  examples: string[];
  risks: string[];
  bestPractices: string[];
}

export const LEARN_REGISTRY: Record<string, LearnContent> = {
  "git.init": {
    purpose: "Create a new Git repository in the current directory.",
    syntax: "git init [-b <default-branch>]",
    examples: ["git init", "git init -b main"],
    risks: ["Running in the wrong folder creates a nested .git directory."],
    bestPractices: ["Run from project root", "Add a .gitignore before first commit"],
  },
  "git.clone": {
    purpose: "Copy a remote repository to your machine.",
    syntax: "git clone <url> [<directory>]",
    examples: ["git clone https://github.com/user/repo.git", "git clone git@github.com:user/repo.git my-folder"],
    risks: ["Cloning into a non-empty directory can fail."],
    bestPractices: ["Use SSH for frequent pushes", "Clone with a meaningful folder name"],
  },
  "git.status": {
    purpose: "Show working tree state: staged, unstaged, and untracked files.",
    syntax: "git status [-s]",
    examples: ["git status", "git status -sb"],
    risks: [],
    bestPractices: ["Run before every commit", "Use short status in scripts"],
  },
  "git.branch.create": {
    purpose: "Create a new branch and optionally switch to it.",
    syntax: "git switch -c <name>  |  git branch <name>",
    examples: ["git switch -c feature/login", "git branch hotfix"],
    risks: ["Branch names with invalid characters are rejected."],
    bestPractices: ["Use descriptive names", "Branch from updated main"],
  },
  "git.branch.delete": {
    purpose: "Remove a local branch reference.",
    syntax: "git branch -d <name>  (safe)  |  git branch -D <name>  (force)",
    examples: ["git branch -d old-feature", "git branch -D experiment"],
    risks: ["-D deletes even if not merged; unmerged work can be lost."],
    bestPractices: ["Merge or backup first", "Delete remote branch separately"],
  },
  "git.commit": {
    purpose: "Record staged changes as a snapshot in history.",
    syntax: "git commit -m \"message\"",
    examples: ['git commit -m "Add user auth"', "git commit -am \"Quick fix\""],
    risks: ["Commits without review can include secrets or debug code."],
    bestPractices: ["Write clear messages", "Commit small logical units"],
  },
  "git.commit.amend": {
    purpose: "Modify the last commit (message or contents).",
    syntax: "git commit --amend [-m \"message\"]",
    examples: ["git commit --amend -m \"Fixed typo in message\"", "git commit --amend --no-edit"],
    risks: ["Rewrites history; do not amend pushed commits without team agreement."],
    bestPractices: ["Only amend unpushed commits", "Use fixup/squash for older commits"],
  },
  "git.fetch": {
    purpose: "Download objects and refs from remote without merging.",
    syntax: "git fetch [<remote>]",
    examples: ["git fetch", "git fetch origin"],
    risks: [],
    bestPractices: ["Fetch often", "Inspect before merge or rebase"],
  },
  "git.pull": {
    purpose: "Fetch and integrate remote changes into current branch.",
    syntax: "git pull [<remote>] [<branch>]",
    examples: ["git pull", "git pull origin main"],
    risks: ["Can create merge commits or conflicts unexpectedly."],
    bestPractices: ["Pull on feature branches regularly", "Prefer rebase if team uses linear history"],
  },
  "git.push": {
    purpose: "Upload local commits to a remote repository.",
    syntax: "git push [<remote>] [<branch>]",
    examples: ["git push", "git push -u origin feature/api"],
    risks: ["Force push overwrites remote history."],
    bestPractices: ["Set upstream on first push", "Never force push shared branches"],
  },
  "git.push.force": {
    purpose: "Overwrite remote branch with your local branch.",
    syntax: "git push --force  |  git push --force-with-lease",
    examples: ["git push --force-with-lease origin main"],
    risks: ["Permanently removes commits others may rely on."],
    bestPractices: ["Prefer --force-with-lease", "Coordinate with team", "Never on main/master"],
  },
  "git.merge": {
    purpose: "Combine another branch into the current branch.",
    syntax: "git merge <branch> [--no-ff | --ff-only]",
    examples: ["git merge feature/login", "git merge --no-ff release"],
    risks: ["Conflicts require manual resolution."],
    bestPractices: ["Update branch before merging", "Run tests after merge"],
  },
  "git.rebase": {
    purpose: "Replay commits on top of another base (linear history).",
    syntax: "git rebase <upstream>  |  git rebase -i <upstream>",
    examples: ["git rebase main", "git rebase -i HEAD~3"],
    risks: ["Rewrites history; conflicts mid-rebase need care."],
    bestPractices: ["Do not rebase public/shared branches", "Use interactive rebase to clean up"],
  },
  "git.cherry-pick": {
    purpose: "Apply specific commit(s) onto the current branch.",
    syntax: "git cherry-pick <commit>...",
    examples: ["git cherry-pick abc1234", "git cherry-pick A..B"],
    risks: ["Duplicate commits if cherry-picked twice.", "Conflicts like merge."],
    bestPractices: ["Cherry-pick one logical change at a time", "Note source in commit message"],
  },
  "git.stash": {
    purpose: "Temporarily shelve uncommitted changes.",
    syntax: "git stash [push -m \"name\"]  |  git stash pop",
    examples: ['git stash push -m "wip login"', "git stash pop"],
    risks: ["Dropped stashes are hard to recover without reflog."],
    bestPractices: ["Use named stashes", "Pop when ready to continue work"],
  },
  "git.tag": {
    purpose: "Mark a point in history (release versions).",
    syntax: "git tag <name>  |  git tag -a <name> -m \"msg\"",
    examples: ["git tag v1.0.0", "git tag -a v2.0.0 -m \"Release 2.0\""],
    risks: ["Deleting tags on remote affects consumers."],
    bestPractices: ["Use annotated tags for releases", "Push tags explicitly"],
  },
  "git.reflog": {
    purpose: "Log of where HEAD and branch tips have been (recovery lifeline).",
    syntax: "git reflog [show]",
    examples: ["git reflog", "git reflog show feature/login"],
    risks: [],
    bestPractices: ["Use after reset, branch delete, or lost commits", "Entries expire after ~90 days"],
  },
  "git.reset.hard": {
    purpose: "Move branch tip and reset index and working tree (discards changes).",
    syntax: "git reset --hard <ref>",
    examples: ["git reset --hard HEAD~1", "git reset --hard origin/main"],
    risks: ["Permanently discards uncommitted and uncommitted-to-reflog work."],
    bestPractices: ["Stash or commit first", "Use soft/mixed reset when unsure"],
  },
  "git.clean": {
    purpose: "Remove untracked files from working directory.",
    syntax: "git clean -fd [-n]",
    examples: ["git clean -fdn", "git clean -fd"],
    risks: ["Untracked files are deleted permanently."],
    bestPractices: ["Always dry-run (-n) first", "Ensure build artifacts belong in .gitignore"],
  },
  "git.remote.add": {
    purpose: "Register a remote repository URL under a short name.",
    syntax: "git remote add <name> <url>",
    examples: ["git remote add origin https://github.com/user/repo.git"],
    risks: ["Wrong URL causes push/pull failures."],
    bestPractices: ["Use origin for primary remote", "Verify with git remote -v"],
  },
  "gh.auth.login": {
    purpose: "Authenticate GitHub CLI for repo and PR operations.",
    syntax: "gh auth login",
    examples: ["gh auth login"],
    risks: [],
    bestPractices: ["Use HTTPS or SSH consistently with git remote"],
  },
  "gh.pr.create": {
    purpose: "Open a pull request from the current branch.",
    syntax: "gh pr create [--title] [--body]",
    examples: ["gh pr create --fill", "gh pr create -t \"Fix bug\" -b \"Details...\""],
    risks: [],
    bestPractices: ["Push branch first", "Link issue in body when applicable"],
  },
};
