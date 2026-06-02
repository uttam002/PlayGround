# Git Command Assistant

Interactive Git assistant with menus, safety confirmations, learning mode, recovery workflows, GitHub CLI integration, and repository doctor.

## Run

```bash
npm run git-helper
```

## CLI extensions (AI-ready)

```bash
npm run git-helper -- doctor
npm run git-helper -- learn git.rebase
npm run git-helper -- explain "error: pathspec did not match"
npm run git-helper -- fix
```

## Structure

```text
scripts/git-helper/
├── index.ts
├── config/
├── constants/
├── menus/
├── commands/
├── services/
└── utils/
```
