#!/bin/bash
# deploy.sh — Script de despliegue ejemplo para OpenCode
set -e

echo "🚀 Desplegando..."
npm run build
npm run migrate:prod
npm run seed:prod
echo "✅ Despliegue completado"
