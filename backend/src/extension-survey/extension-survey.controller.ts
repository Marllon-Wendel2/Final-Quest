import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ExtensionSurveyService } from './extension-survey.service';
import {
  PostCourseSurveyPipe,
  PreCourseSurveyPipe,
  type PostCourseSurveyDto,
  type PreCourseSurveyDto,
} from './dto/extension-survey.dto';

@ApiTags('Extension Survey')
@ApiCookieAuth('token')
@Controller('extension-survey')
@UseGuards(JwtAuthGuard)
export class ExtensionSurveyController {
  constructor(private readonly surveyService: ExtensionSurveyService) {}

  @Get('me')
  @ApiOperation({ summary: 'Obter status dos formulários pré/pós do aluno' })
  @ApiResponse({ status: 200, description: 'Status dos formulários do aluno' })
  getMySurvey(
    @Request() req: { user: { id: string } },
    @Query('courseId') courseId?: string,
  ) {
    return this.surveyService.getMySurvey(req.user.id, courseId);
  }

  @Post('pre')
  @ApiOperation({ summary: 'Enviar formulário pré-curso da oficina' })
  @ApiResponse({ status: 201, description: 'Formulário pré-curso registrado' })
  submitPreSurvey(
    @Request() req: { user: { id: string } },
    @Body(PreCourseSurveyPipe) dto: PreCourseSurveyDto,
  ) {
    return this.surveyService.submitPreSurvey(req.user.id, dto);
  }

  @Post('post')
  @ApiOperation({
    summary: 'Enviar avaliação pós-curso e liberar certificado',
  })
  @ApiResponse({
    status: 201,
    description: 'Avaliação registrada e certificado liberado',
  })
  submitPostSurvey(
    @Request() req: { user: { id: string } },
    @Body(PostCourseSurveyPipe) dto: PostCourseSurveyDto,
  ) {
    return this.surveyService.submitPostSurvey(req.user.id, dto);
  }

  @Get('report')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Relatório consolidado do projeto de extensão (Admin)',
  })
  @ApiResponse({ status: 200, description: 'Dados consolidados da oficina' })
  getReport(@Query('courseId') courseId?: string) {
    return this.surveyService.getExtensionReport(courseId);
  }
}
