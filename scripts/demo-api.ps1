$ErrorActionPreference = "Stop"

Write-Host "GET http://localhost:4000/health"
Invoke-RestMethod -Uri "http://localhost:4000/health" | ConvertTo-Json -Depth 6

Write-Host "GET http://localhost:4000/api/demo-voyage/entries"
Invoke-RestMethod -Uri "http://localhost:4000/api/demo-voyage/entries" | ConvertTo-Json -Depth 6
