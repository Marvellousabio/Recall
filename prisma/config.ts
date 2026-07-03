import path from 'node:path';

export default {
  datasource: {
    url: process.env.DATABASE_URL || '',
  },
};
