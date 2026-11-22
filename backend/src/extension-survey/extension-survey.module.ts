import { Module } from '@nestjs/common';
import { ExtensionSurveyController } from './extension-survey.controller';
import { ExtensionSurveyService } from './extension-survey.service';

@Module({
  controllers: [ExtensionSurveyController],
  providers: [ExtensionSurveyService],
  exports: [ExtensionSurveyService],
})
export class ExtensionSurveyModule {}
