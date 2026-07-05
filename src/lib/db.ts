import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient;

// Resolve SQLite path relative to working directory
const dbPath = path.join(process.cwd(), "dev.db");
const url = `file:${dbPath}`;

if (process.env.NODE_ENV === "production") {
  const adapter = new PrismaBetterSqlite3({ url });
  prismaInstance = new PrismaClient({ adapter });
} else {
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaBetterSqlite3({ url });
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  prismaInstance = globalForPrisma.prisma;
}

export const db = prismaInstance;
export default db;
