$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot

Write-Host "Building backend..."
pnpm --dir (Join-Path $root "pirate-ocean-portfolio-backend") build

Write-Host "Building frontend..."
pnpm --dir (Join-Path $root "pirate-ocean-portfolio-frontend") build

Write-Host "Both builds completed."
