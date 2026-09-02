import { PrismaService } from '../prisma/prisma.service';

/**
 * Seed separado para adicionar a missão "Desafie o Fantasma"
 * em bancos de dados que já possuem missões.
 *
 * Uso:
 *   npx ts-node -r tsconfig-paths/register src/mission/seed-ghost-challenge.ts
 *
 * Ou chamar diretamente de um service/controller:
 *   await seedGhostChallenge(prisma);
 */
export async function seedGhostChallenge(prisma: PrismaService): Promise<void> {
  const exists = await prisma.mission.findFirst({
    where: { title: 'Desafie o Fantasma' },
  });

  if (exists) {
    console.log('[seed] Missão "Desafie o Fantasma" já existe, ignorando.');
    return;
  }

  await prisma.mission.create({
    data: {
      title: 'Desafie o Fantasma',
      description:
        'O fantasma desafia seu grupo! Vença o MemoryGame para prosseguir.',
      points: 100,
      frequency: 'ONCE',
      challengeType: 'MEMORY',
    },
  });

  console.log('[seed] Missão "Desafie o Fantasma" criada com sucesso!');
}
