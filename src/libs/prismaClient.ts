import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line
  var prisma: PrismaClient | undefined;
}

const prismaClient = globalThis.prisma || new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaClient;
}

export default prismaClient;
