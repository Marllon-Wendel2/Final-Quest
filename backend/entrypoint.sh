#!/bin/sh
set -e

echo "Aguardando PostgreSQL ficar disponivel..."

until pg_isready -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -q 2>/dev/null; do
  echo "PostgreSQL ainda nao esta pronto, aguardando..."
  sleep 2
done

echo "PostgreSQL esta pronto!"

echo "Gerando Prisma Client..."
npx prisma generate

echo "Rodando prisma migrate deploy..."
npx prisma migrate deploy

echo "Iniciando backend..."
exec npm run start:dev
