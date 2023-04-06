#!/usr/bin/env bash
set -e

/opt/wait.sh postgres:5432
npm run migration:run
npm run seed:run
npm run start:prod
