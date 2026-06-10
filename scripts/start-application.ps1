$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$frontend = Join-Path $root "pirate-ocean-portfolio-frontend"
$backend = Join-Path $root "pirate-ocean-portfolio-backend"

# --- Guard: Kill any leftover dev-server processes on the ports before starting ---
function Kill-Port {
  param([int]$Port)
  $connections = netstat -ano | Select-String ":$Port\s" | Select-String "LISTENING"
  foreach ($line in $connections) {
    $parts = $line -split '\s+'
    $pid = $parts[-1]
    if ($pid -match '^\d+$' -and $pid -ne '0') {
      Write-Host "  Killing process $pid on port $Port..."
      Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
  }
}

Write-Host "Cleaning up any leftover processes on ports 3000 and 4000..."
Kill-Port 3000
Kill-Port 4000

Write-Host ""
Write-Host "Starting backend dev server (http://localhost:4000)..."
Write-Host "Starting frontend dev server (http://localhost:3000)..."
Write-Host ""
Write-Host "Press Ctrl+C to stop BOTH servers."
Write-Host ""

# Start backend as a background job (same PowerShell session, killable via Ctrl+C)
$backendJob = Start-Job -ScriptBlock {
  param($dir)
  Set-Location $dir
  pnpm dev 2>&1
} -ArgumentList $backend

# Start frontend as a background job (same PowerShell session, killable via Ctrl+C)
$frontendJob = Start-Job -ScriptBlock {
  param($dir)
  Set-Location $dir
  pnpm dev 2>&1
} -ArgumentList $frontend

# Stream output from both jobs until Ctrl+C
try {
  while ($true) {
    $backendOutput = Receive-Job -Job $backendJob -ErrorAction SilentlyContinue
    $frontendOutput = Receive-Job -Job $frontendJob -ErrorAction SilentlyContinue

    foreach ($line in $backendOutput)  { Write-Host "[backend]  $line" }
    foreach ($line in $frontendOutput) { Write-Host "[frontend] $line" }

    # Check if either job died unexpectedly
    if ($backendJob.State -eq "Failed" -or $backendJob.State -eq "Completed") {
      Write-Warning "Backend process exited unexpectedly!"
      Receive-Job -Job $backendJob -ErrorAction SilentlyContinue | ForEach-Object { Write-Host "[backend] $_" }
      break
    }
    if ($frontendJob.State -eq "Failed" -or $frontendJob.State -eq "Completed") {
      Write-Warning "Frontend process exited unexpectedly!"
      Receive-Job -Job $frontendJob -ErrorAction SilentlyContinue | ForEach-Object { Write-Host "[frontend] $_" }
      break
    }

    Start-Sleep -Milliseconds 500
  }
} finally {
  Write-Host ""
  Write-Host "Shutting down dev servers..."
  Stop-Job -Job $backendJob  -ErrorAction SilentlyContinue
  Stop-Job -Job $frontendJob -ErrorAction SilentlyContinue
  Remove-Job -Job $backendJob  -Force -ErrorAction SilentlyContinue
  Remove-Job -Job $frontendJob -Force -ErrorAction SilentlyContinue

  # Also kill any remaining processes on the ports
  Kill-Port 3000
  Kill-Port 4000

  Write-Host "All dev servers stopped."
}
