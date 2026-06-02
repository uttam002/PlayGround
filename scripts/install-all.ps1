$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot

Write-Host "Installing backend dependencies..."
pnpm --dir (Join-Path $root "pirate-ocean-portfolio-backend") install

Write-Host "Installing frontend dependencies..."
pnpm --dir (Join-Path $root "pirate-ocean-portfolio-frontend") install

Write-Host "All dependencies are installed."
