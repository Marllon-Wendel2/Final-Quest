import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMissionDto, UpdateMissionDto } from './dto/mission.dto';

@Injectable()
export class MissionService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMission(createMissionDto: CreateMissionDto) {
    try {
      const mission = await this.prismaService.mission.create({
        data: createMissionDto,
      });
      return mission;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao criar missão');
    }
  }

  async getAllMissions() {
    try {
      const missions = await this.prismaService.mission.findMany();
      if (missions.length === 0) {
        throw new NotFoundException('Nenhuma missão encontrada');
      }
      return missions;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao buscar as missões');
    }
  }

  async getMissionById(id: string) {
    try {
      const mission = await this.prismaService.mission.findUnique({
        where: { id },
      });
      if (!mission) {
        throw new NotFoundException('Missão não encontrada');
      }
      return mission;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao buscar a missão');
    }
  }

  async updateMission(id: string, updateMissionDto: UpdateMissionDto) {
    try {
      const mission = await this.prismaService.mission.update({
        where: { id },
        data: updateMissionDto,
      });
      return mission;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro ao tentar atualizar a missão',
      );
    }
  }

  async deleteMission(id: string) {
    try {
      await this.prismaService.mission.delete({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao tentar deletar a missão');
    }
  }
}
