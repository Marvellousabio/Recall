import type { PrismaConfig } from '@prisma/adapter';

const config: PrismaConfig = {
  datasource: process.env.DATABASE_URL || '',
  schema: './prisma/schema.prisma',
};

export default config;
