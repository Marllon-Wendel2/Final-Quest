import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MissionService } from './mission.service';
import {
  CreateMissionPipe,
  type UpdateMissionDto,
  type CreateMissionDto,
  UpdateMissionPipe,
} from './dto/mission.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('mission')
@UseGuards(JwtAuthGuard)
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  createMission(@Body(CreateMissionPipe) createMissionDto: CreateMissionDto) {
    return this.missionService.createMission(createMissionDto);
  }

  @Get()
  getAllMissions() {
    return this.missionService.getAllMissions();
  }

  @Get(':id')
  getMissionById(@Param('id') id: string) {
    return this.missionService.getMissionById(id);
  }

  @Patch(':id')
  updateMission(
    @Param('id') id: string,
    @Body(UpdateMissionPipe) updateMissionDto: UpdateMissionDto,
  ) {
    return this.missionService.updateMission(id, updateMissionDto);
  }

  @Delete(':id')
  deleteMission(@Param('id') id: string) {
    return this.missionService.deleteMission(id);
  }
}
