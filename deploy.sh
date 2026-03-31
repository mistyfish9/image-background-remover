#!/bin/bash
source "$(dirname "$0")/.env.deploy"
cd "$(dirname "$0")"
CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN npx wrangler pages deploy public --project-name $PROJECT_NAME --branch main
