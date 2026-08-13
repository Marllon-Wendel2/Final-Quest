import { execSync } from 'child_process';
import { resolve } from 'path';

export default function globalSetup() {
  process.env.DATABASE_URL =
    'postgresql://postgres:postgres@localhost:5433/final_quest_test';

  const backendDir = resolve(__dirname, '..');
  execSync('npx prisma migrate deploy', { cwd: backendDir });
}
