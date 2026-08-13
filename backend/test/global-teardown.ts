import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

export default async function globalTeardown() {
  const connectionString =
    'postgresql://postgres:postgres@localhost:5433/final_quest_test';

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  await prisma.$executeRaw`TRUNCATE TABLE player_missions CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE missions CASCADE`;

  await prisma.$disconnect();
  await pool.end();
}
