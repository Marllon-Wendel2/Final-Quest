import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { MissionService } from './mission.service';
import {
  CreateMissionPipe,
  type UpdateMissionDto,
  type CreateMissionDto,
  UpdateMissionPipe,
} from './dto/mission.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Missions')
@ApiCookieAuth('token')
@Controller('mission')
@UseGuards(JwtAuthGuard)
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova missão' })
  @ApiResponse({ status: 201, description: 'Missão criada com sucesso' })
  createMission(@Body(CreateMissionPipe) createMissionDto: CreateMissionDto) {
    return this.missionService.createMission(createMissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as missões' })
  @ApiResponse({ status: 200, description: 'Lista de missões' })
  getAllMissions() {
    return this.missionService.getAllMissions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter missão por ID' })
  @ApiResponse({ status: 200, description: 'Dados da missão' })
  @ApiResponse({ status: 404, description: 'Missão não encontrada' })
  getMissionById(@Param('id') id: string) {
    return this.missionService.getMissionById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar missão' })
  @ApiResponse({ status: 200, description: 'Missão atualizada' })
  updateMission(
    @Param('id') id: string,
    @Body(UpdateMissionPipe) updateMissionDto: UpdateMissionDto,
  ) {
    return this.missionService.updateMission(id, updateMissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar missão' })
  @ApiResponse({ status: 200, description: 'Missão deletada' })
  deleteMission(@Param('id') id: string) {
    return this.missionService.deleteMission(id);
  }
}
