# Git Command Encyclopedia

## Complete Developer Reference Guide

---

# Table of Contents

1. Introduction
2. Git Installation & Configuration
3. Repository Management
4. Branch Management
5. Daily Development Workflow
6. Commit Management
7. Remote Repository Management
8. Synchronization (Fetch, Pull, Push)
9. Merge Operations
10. Rebase Operations
11. Cherry-Pick Operations
12. Stash Operations
13. Undo & Recovery Operations
14. Tag Management
15. GitHub CLI Operations
16. Pull Request Workflow
17. Git Troubleshooting
18. Advanced Git Operations
19. Repository Maintenance
20. Security & Best Practices
21. Real-World Scenarios
22. Recommended Team Workflow

---

# 1. Introduction

Git is a distributed version control system used to track changes, collaborate with teams, and manage software source code.

Useful for:

* Source control
* Collaboration
* Release management
* Rollback and recovery
* Audit history

---

# 2. Git Installation & Configuration

## Verify Git Installation

```bash
git --version
```

Example:

```bash
git version 2.45.2
```

---

## Configure Username

```bash
git config --global user.name "John Doe"
```

---

## Configure Email

```bash
git config --global user.email "john@example.com"
```

---

## View Configuration

```bash
git config --list
```

---

## Check Specific Configuration

```bash
git config user.name
git config user.email
```

---

## Configure Default Branch

```bash
git config --global init.defaultBranch main
```

---

# 3. Repository Management

## Initialize Repository

```bash
git init
```

Creates:

```text
.git/
```

---

## Clone Repository

```bash
git clone https://github.com/user/repository.git
```

---

## Clone Specific Branch

```bash
git clone -b develop https://github.com/user/repository.git
```

---

## View Repository Information

```bash
git remote -v
```

---

## Create Repository From Existing Project

```bash
git init
git add .
git commit -m "Initial commit"
```

---

# 4. Branch Management

## View Current Branch

```bash
git branch --show-current
```

---

## View All Branches

```bash
git branch
```

---

## View Remote Branches

```bash
git branch -r
```

---

## View All Local + Remote Branches

```bash
git branch -a
```

---

## Create Branch

```bash
git branch feature/login
```

---

## Switch Branch

```bash
git switch feature/login
```

or

```bash
git checkout feature/login
```

---

## Create and Switch

```bash
git switch -c feature/login
```

---

## Rename Branch

```bash
git branch -m old-name new-name
```

---

## Delete Branch

```bash
git branch -d feature/login
```

---

## Force Delete Branch

```bash
git branch -D feature/login
```

---

# 5. Daily Development Workflow

## Check Status

```bash
git status
```

---

## Stage Single File

```bash
git add app.js
```

---

## Stage All Changes

```bash
git add .
```

---

## Commit Changes

```bash
git commit -m "Added login functionality"
```

---

## Commit All Tracked Changes

```bash
git commit -am "Bug fixes"
```

---

## View Commit History

```bash
git log
```

---

## Compact History

```bash
git log --oneline
```

---

## Visual History

```bash
git log --graph --oneline --decorate --all
```

---

# 6. Commit Management

## Amend Last Commit

```bash
git commit --amend
```

---

## Amend Without Changing Message

```bash
git commit --amend --no-edit
```

---

## Change Last Commit Message

```bash
git commit --amend -m "Updated commit message"
```

---

## Interactive Rebase

```bash
git rebase -i HEAD~5
```

Use for:

* Squashing commits
* Reordering commits
* Editing commit messages

---

# 7. Remote Repository Management

## Add Remote

```bash
git remote add origin https://github.com/user/repo.git
```

---

## Verify Remote

```bash
git remote -v
```

---

## Change Remote URL

```bash
git remote set-url origin https://github.com/user/new-repo.git
```

---

## Remove Remote

```bash
git remote remove origin
```

---

## Rename Remote

```bash
git remote rename origin upstream
```

---

# 8. Synchronization

## Fetch Changes

```bash
git fetch
```

---

## Fetch All Remotes

```bash
git fetch --all
```

---

## Pull Latest Changes

```bash
git pull
```

---

## Pull Specific Branch

```bash
git pull origin develop
```

---

## Push Current Branch

```bash
git push
```

---

## Push First Time

```bash
git push -u origin develop
```

---

## Force Push (Dangerous)

```bash
git push --force
```

---

## Safer Force Push

```bash
git push --force-with-lease
```

---

# 9. Merge Operations

## Merge Branch

```bash
git merge feature/login
```

---

## Abort Merge

```bash
git merge --abort
```

---

## No Fast Forward Merge

```bash
git merge --no-ff feature/login
```

---

# 10. Rebase Operations

## Rebase Current Branch

```bash
git rebase develop
```

---

## Continue Rebase

```bash
git rebase --continue
```

---

## Abort Rebase

```bash
git rebase --abort
```

---

## Skip Commit During Rebase

```bash
git rebase --skip
```

---

# 11. Cherry Pick Operations

## Cherry Pick Single Commit

```bash
git cherry-pick commit-id
```

---

## Cherry Pick Multiple Commits

```bash
git cherry-pick commit1 commit2 commit3
```

---

## Abort Cherry Pick

```bash
git cherry-pick --abort
```

---

# 12. Stash Operations

## Create Stash

```bash
git stash
```

---

## Named Stash

```bash
git stash push -m "WIP Login Page"
```

---

## View Stashes

```bash
git stash list
```

---

## Apply Stash

```bash
git stash apply
```

---

## Pop Stash

```bash
git stash pop
```

---

## Delete Stash

```bash
git stash drop stash@{0}
```

---

# 13. Undo & Recovery Operations

## Unstage File

```bash
git restore --staged file.txt
```

---

## Discard File Changes

```bash
git restore file.txt
```

---

## Reset Last Commit Keep Changes

```bash
git reset --soft HEAD~1
```

---

## Reset Last Commit Remove Changes

```bash
git reset --hard HEAD~1
```

---

## Recover Lost Commits

```bash
git reflog
```

---

## Restore Commit

```bash
git reset --hard commit-id
```

---

## Recover Deleted Branch

```bash
git reflog
git checkout -b recovered-branch commit-id
```

---

# 14. Tag Management

## Create Tag

```bash
git tag v1.0.0
```

---

## Annotated Tag

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
```

---

## Push Tag

```bash
git push origin v1.0.0
```

---

## Push All Tags

```bash
git push --tags
```

---

# 15. GitHub CLI Operations

## Verify Installation

```bash
gh --version
```

---

## Login

```bash
gh auth login
```

---

## Check Login

```bash
gh auth status
```

---

## Create Repository

```bash
gh repo create MyProject --public
```

---

## Create Repository and Push

```bash
gh repo create MyProject --public --source=. --remote=origin --push
```

---

## Clone Repository

```bash
gh repo clone owner/repo
```

---

## Create Pull Request

```bash
gh pr create
```

---

## View Pull Requests

```bash
gh pr list
```

---

## Merge Pull Request

```bash
gh pr merge
```

---

# 16. Common Git Errors & Fixes

## Repository Not Found

```bash
git remote -v
```

Verify URL.

Update:

```bash
git remote set-url origin NEW_URL
```

---

## Remote Origin Already Exists

```bash
git remote remove origin
git remote add origin NEW_URL
```

---

## Authentication Failed

Re-authenticate:

```bash
gh auth login
```

---

## Detached HEAD

```bash
git switch main
```

or

```bash
git checkout -b recovery-branch
```

---

## Non Fast Forward Error

```bash
git pull origin develop
git push origin develop
```

---

# 17. Advanced Git Operations

## Bisect

```bash
git bisect start
git bisect bad
git bisect good commit-id
```

---

## Worktree

```bash
git worktree add ../feature-login feature/login
```

---

## Sparse Checkout

```bash
git sparse-checkout init
git sparse-checkout set src
```

---

## Submodule

```bash
git submodule add REPOSITORY_URL
```

---

# 18. Real-World Recovery Scenarios

## Accidentally Force Pushed

```bash
git reflog
git reset --hard previous-commit
git push --force-with-lease
```

---

## Deleted Branch Accidentally

```bash
git reflog
git checkout -b recovered-branch commit-id
```

---

## Commit Contains Secrets

```bash
git reset HEAD~1
```

Remove secrets and recommit.

---

## Pushed To Wrong Branch

```bash
git log
git cherry-pick commit-id
git reset --hard HEAD~1
```

---

# 19. Recommended Team Workflow

1. Create feature branch.
2. Develop changes.
3. Commit frequently.
4. Pull latest develop.
5. Rebase feature branch.
6. Push feature branch.
7. Create Pull Request.
8. Code Review.
9. Merge to develop.
10. Release through release branch.

---

# 20. Golden Rules

* Never force push to main.
* Prefer force-with-lease over force.
* Always pull before push.
* Use feature branches.
* Commit small logical changes.
* Write meaningful commit messages.
* Keep history clean.
* Use Pull Requests.
* Review before merging.
* Use reflog before panicking.

END OF DOCUMENT
