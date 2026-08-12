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
          title: 'Chegue na dungeon',
          description: 'Encontre e chegue na dungeon do jogo',
          points: 10,
        },
        {
          title: 'Derrote 5 goblins',
          description: 'Vença 5 goblins em batalha',
          points: 20,
        },
        {
          title: 'Consiga um pet',
          description: 'Adote ou encontre um pet para te acompanhar',
          points: 15,
        },
        {
          title: 'Beba 4 litros de água',
          description: 'Mantenha-se hidratado bebendo 4 litros de água',
          points: 10,
        },
        {
          title: 'Durma 7 horas para restaurar seu personagem',
          description: 'Durma pelo menos 7 horas para restaurar energia',
          points: 15,
        },
      ],
    });

    this.logger.log('5 missões criadas com sucesso!');
  }
}
