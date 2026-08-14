#!/bin/sh
set -e

echo "Rodando prisma migrate deploy..."
npx prisma migrate deploy

echo "Verificando estrutura da pasta dist..."
ls -la dist/

echo "Iniciando backend em produção..."
if [ -f "dist/src/main.js" ]; then
  exec node dist/src/main.js
else
  exec node dist/main.js
fi
