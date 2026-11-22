import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface VideoLessonSeed {
  lessonNumber: number;
  title: string;
  description: string;
  points: number;
}

const VIDEO_LESSON_MISSIONS: VideoLessonSeed[] = [
  {
    lessonNumber: 1,
    title: 'Aula 1: Introdução à Lógica',
    description:
      'Assista à primeira aula do curso e responda às perguntas para ganhar XP!',
    points: 150,
  },
  {
    lessonNumber: 2,
    title: 'Aula 2: Primeiro Algoritmo',
    description:
      'Desvende os primeiros segredos do Portugol no VisuAlg, domine variáveis e quebre a lendária maldição do Olá, Mundo!',
    points: 150,
  },
  {
    lessonNumber: 3,
    title: 'Aula 3: Comando de Entrada e Operadores',
    description:
      'Aprenda a dialogar com o usuário usando o comando Leia e domine operadores e funções aritméticas no VisuAlg!',
    points: 150,
  },
  {
    lessonNumber: 4,
    title: 'Aula 4: Operadores Lógicos e Relacionais',
    description:
      'Domine comparações relacionais, tabelas-verdade dos operadores lógicos e construa o teste lógico dos triângulos!',
    points: 150,
  },
  {
    lessonNumber: 5,
    title: 'Aula 5: Introdução ao Scratch',
    description:
      'Explore o universo visual do Scratch, encaixe blocos de lógica e dê vida a personagens interativos e mini-jogos!',
    points: 150,
  },
  {
    lessonNumber: 6,
    title: 'Aula 6: Exercícios de Algoritmo Resolvidos',
    description:
      'Pratique estruturas sequenciais no Scratch e no VisuAlg ajudando a Creuza a resolver problemas do dia a dia com cálculos, conversões e porcentagens.',
    points: 200,
  },
  {
    lessonNumber: 7,
    title: 'Aula 7: Estruturas Condicionais (Parte 1)',
    description:
      'Aprenda a tomar decisões nos seus algoritmos usando estruturas condicionais simples (Se) e compostas (Se/Senao) no Scratch e no VisuAlg.',
    points: 200,
  },
  {
    lessonNumber: 8,
    title: 'Aula 8: Estruturas Condicionais (Parte 2)',
    description:
      'Domine decisões com múltiplas possibilidades utilizando condicionais aninhadas (Se/Senao encadeados) e a estrutura Escolha-Caso no VisuAlg.',
    points: 200,
  },
  {
    lessonNumber: 9,
    title: 'Aula 9: Estruturas de Repetição (Parte 1)',
    description:
      'Dê os primeiros passos em laços de repetição usando a estrutura Enquanto no VisuAlg, contadores, acumuladores e cuidados contra loops infinitos.',
    points: 200,
  },
  {
    lessonNumber: 10,
    title: 'Aula 10: Estruturas de Repetição 2 (Repita)',
    description:
      'Aprenda a usar a estrutura de repetição Repita com teste lógico no final e pratique com tabuada, fatorial e números primos.',
    points: 200,
  },
  {
    lessonNumber: 11,
    title: 'Aula 11: Estruturas de Repetição 3 (Para)',
    description:
      'Domine a estrutura de repetição Para com variável de controle, saiba quando escolhê-la e pratique laços aninhados.',
    points: 250,
  },
  {
    lessonNumber: 12,
    title: 'Aula 12: Procedimentos (Rotinas — Parte 1)',
    description:
      'Aprenda a organizar código repetitivo em procedimentos, entenda o escopo de variáveis e diferencie passagem por valor e por referência.',
    points: 250,
  },
  {
    lessonNumber: 13,
    title: 'Aula 13: Funções (Rotinas Parte 2)',
    description:
      'Aprenda a criar funções com valor de retorno, aplicar passagem de parâmetros por referência e usar funções prontas de texto no VisuAlg.',
    points: 250,
  },
  {
    lessonNumber: 14,
    title: 'Aula 14: Vetores (Variáveis Compostas Parte 1)',
    description:
      'Descubra como armazenar vários valores do mesmo tipo em uma única variável usando vetores, percorrer índices com laços e ordenar elementos no VisuAlg.',
    points: 250,
  },
  {
    lessonNumber: 15,
    title: 'Aula 15: Matrizes (Variáveis Compostas Parte 2)',
    description:
      'Domine matrizes (variáveis compostas multidimensionais), percorra linhas e colunas com laços aninhados e resolva operações clássicas como a diagonal principal.',
    points: 300,
  },
];

@Injectable()
export class MissionSeedService implements OnModuleInit {
  private readonly logger = new Logger(MissionSeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.ensureVideoLessonMissionsExist();
  }

  private async ensureVideoLessonMissionsExist(): Promise<void> {
    let createdCount = 0;

    for (const lesson of VIDEO_LESSON_MISSIONS) {
      const existing = await this.prisma.mission.findFirst({
        where: { title: lesson.title },
      });

      if (existing) continue;

      await this.prisma.mission.create({
        data: {
          title: lesson.title,
          description: lesson.description,
          points: lesson.points,
          frequency: 'ONCE',
          challengeType: 'VIDEO_LESSON' as any,
          isActive: true,
        },
      });

      createdCount += 1;
      this.logger.log(`Missão "${lesson.title}" criada.`);
    }

    if (createdCount > 0) {
      this.logger.log(
        `${createdCount} missão(ões) de videoaula criada(s) com sucesso.`,
      );
    }
  }
}
