#!/bin/bash
# Bash script to run seed data script
# Sets environment variables and runs the seed script

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
BACKEND_DIR=$(readlink -f "$SCRIPT_DIR/..")
SERVICE_ACCOUNT_PATH="$BACKEND_DIR/config/firebase-service-account.json"

# Use absolute path to avoid path resolution issues
export GOOGLE_APPLICATION_CREDENTIALS="$SERVICE_ACCOUNT_PATH"
export FIREBASE_PROJECT_ID="sves-daq"

echo "Setting environment variables..."
echo "GOOGLE_APPLICATION_CREDENTIALS: $GOOGLE_APPLICATION_CREDENTIALS"
echo "FIREBASE_PROJECT_ID: $FIREBASE_PROJECT_ID"
echo ""

# Change to backend directory before running npm
cd "$BACKEND_DIR"
npm run seed
