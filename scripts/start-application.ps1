$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$frontend = Join-Path $root "pirate-ocean-portfolio-frontend"
$backend = Join-Path $root "pirate-ocean-portfolio-backend"

Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-Command",
  "Set-Location '$backend'; pnpm dev"
) -WindowStyle Normal

Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-Command",
  "Set-Location '$frontend'; pnpm dev"
) -WindowStyle Normal

Write-Host "Started backend and frontend dev servers."
Write-Host "Backend:  http://localhost:4000"
Write-Host "Frontend: http://localhost:3000"
