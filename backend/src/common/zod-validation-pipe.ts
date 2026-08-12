import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error: unknown) {
      let issues: Array<{ message?: string }> = [];

      if (error instanceof ZodError) {
        issues = error.issues;
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'issues' in error &&
        Array.isArray(error.issues)
      ) {
        issues = (error as { issues: Array<{ message?: string }> }).issues;
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'errors' in error &&
        Array.isArray(error.errors)
      ) {
        issues = (error as { errors: Array<{ message?: string }> }).errors;
      }
      const messages = issues.map((e) => e.message ?? 'Erro desconhecido');
      throw new BadRequestException(`Validação falhou: ${messages.join(', ')}`);
    }
  }
}
