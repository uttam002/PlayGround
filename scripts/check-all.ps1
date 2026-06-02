$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot

Write-Host "Checking backend TypeScript..."
pnpm --dir (Join-Path $root "pirate-ocean-portfolio-backend") typecheck

Write-Host "Linting frontend..."
pnpm --dir (Join-Path $root "pirate-ocean-portfolio-frontend") lint

Write-Host "All checks passed."
