Write-Host "Killing all Node.js processes..."
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "Killing any PowerShell jobs on ports 3000 / 4000..."
foreach ($port in @(3000, 4000)) {
  $connections = netstat -ano | Select-String ":$port\s" | Select-String "LISTENING"
  foreach ($line in $connections) {
    $parts = ($line -split '\s+')
    $pid = $parts[-1]
    if ($pid -match '^\d+$' -and $pid -ne '0') {
      Write-Host "  Killing PID $pid on port $port"
      Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
  }
}

Write-Host "Done. Remaining node processes: $((Get-Process node -ErrorAction SilentlyContinue).Count)"
