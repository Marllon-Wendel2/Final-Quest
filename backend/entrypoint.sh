#!/bin/sh
set -e

echo "Rodando prisma migrate deploy..."
npx prisma migrate deploy

echo "Iniciando backend em produção..."
exec npm run start:prod