import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MissionSeedService implements OnModuleInit {
  private readonly logger = new Logger(MissionSeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const count = await this.prisma.mission.count();
    if (count > 0) {
      this.logger.log('Missões já existem no banco, seed ignorado');
      return;
    }

    this.logger.log('Criando missões iniciais...');

    await this.prisma.mission.createMany({
      data: [
        {
          title: 'Aperte o botão rápido',
          description:
            'Aperte o botão antes que o tempo acabe (uma vez por minuto)',
          points: 5,
          frequency: 'MINUTE',
        },

        {
          title: 'Beba um copo de água',
          description: 'Beba pelo menos um copo de água por hora',
          points: 5,
          frequency: 'HOUR',
        },

        {
          title: 'Beba 4 litros de água',
          description: 'Mantenha-se hidratado bebendo 4 litros de água',
          points: 10,
          frequency: 'DAILY',
        },
        {
          title: 'Durma 7 horas',
          description: 'Durma pelo menos 7 horas para restaurar energia',
          points: 15,
          frequency: 'DAILY',
        },

        {
          title: 'Complete 3 treinos na semana',
          description: 'Faça pelo menos 3 sessões de treino durante a semana',
          points: 50,
          frequency: 'WEEKLY',
        },

        {
          title: 'Chegue na dungeon',
          description: 'Encontre e chegue na dungeon do jogo',
          points: 10,
          frequency: 'ONCE',
        },

        {
          title: 'Derrote 5 goblins',
          description: 'Vença 5 goblins em batalha (pode fazer 3 vezes)',
          points: 20,
          frequency: 'ONCE',
          maxCompletions: 3,
        },
      ],
    });

    this.logger.log('7 missões criadas com sucesso!');
  }
}
