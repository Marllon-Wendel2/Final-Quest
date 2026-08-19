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
          title: 'Carregue sua energia!',
          description:
            'Aperte o botão antes que o tempo acabe (uma vez por minuto)',
          points: 5,
          frequency: 'MINUTE',
          challengeType: 'NONE',
        },

        {
          title: 'Beba um copo de água',
          description: 'Beba pelo menos um copo de água por hora',
          points: 5,
          frequency: 'HOUR',
          challengeType: 'NONE',
        },

        {
          title: 'Faça login',
          description: 'Faça login no jogo para ganhar pontos',
          points: 10,
          frequency: 'DAILY',
          challengeType: 'NONE',
        },
        {
          title: 'Um goblim lhe encontrou na floresta! Derrote ele!',
          description: 'Durma pelo menos 7 horas para restaurar energia',
          points: 15,
          frequency: 'DAILY',
          challengeType: 'TIC_TAC_TOE',
        },

        {
          title: 'SALVE SEUS AMIGOS',
          description:
            'Seu grupo encontrou uma mago, ele dividiu vocês em dois, achem suas metades para continuar a jornada!',
          points: 50,
          frequency: 'ONCE',
          challengeType: 'MEMORY',
          maxCompletions: 5,
        },

        {
          title: 'Chegue na dungeon',
          description: 'Encontre e chegue na dungeon do jogo',
          points: 10,
          frequency: 'ONCE',
          challengeType: 'NONE',
        },

        {
          title: 'Derrote 3 goblins',
          description:
            'Três gomblis te encontraram nas florestas, derrote-os para ganhar pontos',
          points: 50,
          frequency: 'ONCE',
          maxCompletions: 3,
          challengeType: 'TIC_TAC_TOE',
        },
      ],
    });

    this.logger.log('7 missões criadas com sucesso!');
  }
}
