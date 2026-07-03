const config = {
  datasource: {
    url: process.env.DATABASE_URL || '',
  },
  schema: './prisma/schema.prisma',
};

export default config;
