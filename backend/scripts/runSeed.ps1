# PowerShell script to run seed data script
# Sets environment variables and runs the seed script

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$backendDir = Resolve-Path (Join-Path $scriptDir "..")
$serviceAccountPath = Join-Path $backendDir "config\firebase-service-account.json"

# Use absolute path to avoid path resolution issues
$env:GOOGLE_APPLICATION_CREDENTIALS = $serviceAccountPath
$env:FIREBASE_PROJECT_ID = "sves-daq"

Write-Host "Setting environment variables..." -ForegroundColor Cyan
Write-Host "GOOGLE_APPLICATION_CREDENTIALS: $env:GOOGLE_APPLICATION_CREDENTIALS" -ForegroundColor Gray
Write-Host "FIREBASE_PROJECT_ID: $env:FIREBASE_PROJECT_ID" -ForegroundColor Gray
Write-Host ""

# Change to backend directory before running npm
Set-Location $backendDir
npm run seed
