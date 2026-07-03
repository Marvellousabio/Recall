import type { PrismaConfig } from '@prisma/adapter';

const config: PrismaConfig = {
  datasource: {
    url: process.env.DATABASE_URL || '',
  },
};

export default config;
