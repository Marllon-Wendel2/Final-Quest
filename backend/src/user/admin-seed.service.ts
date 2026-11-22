import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminSeedService implements OnModuleInit {
  private readonly logger = new Logger(AdminSeedService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.ensureAdminUserExists();
  }

  private async ensureAdminUserExists(): Promise<void> {
    const name = this.configService.get<string>('USER_ADM')?.trim();
    const email = this.configService.get<string>('EMAIL_ADM')?.trim();
    const password = this.configService.get<string>('PASSWORD_ADM')?.trim();

    if (!name || !email || !password) {
      this.logger.warn(
        'USER_ADM, EMAIL_ADM ou PASSWORD_ADM não definidos no .env — criação automática do ADMIN ignorada.',
      );
      return;
    }

    const existing = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.role !== 'ADMIN') {
        await this.prisma.user.update({
          where: { id: existing.id },
          data: { role: 'ADMIN' },
        });
        this.logger.log(`Usuário "${email}" promovido para ADMIN.`);
      } else {
        this.logger.log(`Usuário ADMIN "${email}" já existe.`);
      }
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await this.prisma.user.create({
      data: {
        name,
        email,
        hashPassword,
        role: 'ADMIN',
      },
    });

    this.logger.log(`Usuário ADMIN "${name}" (${email}) criado com sucesso!`);
  }
}
