import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || (process.env.NODE_ENV === 'production' ? new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.PLANETSCALE_PRISMA_DATABASE_URL}&sslcert=${process.env.PLANETSCALE_SSL_CERT_PATH}`,
    },
  },
}) : new PrismaClient());

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
