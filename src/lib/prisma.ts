// Using require for Prisma v7 compatibility
const { PrismaClient } = require("@prisma/client");

const globalForPrisma = global as any;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
