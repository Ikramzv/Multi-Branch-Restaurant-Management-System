import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Log errors and info
    super({
      log: ['error', 'info'],
    });
  }

  async onModuleInit() {
    // Connect to the database on module init
    await this.$connect();
  }

  async onModuleDestroy() {
    // Disconnect from the database on module destroy
    await this.$disconnect();
  }
}
