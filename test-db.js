const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const path = require('path');

try {
  const dbPath = path.join(process.cwd(), 'dev.db');
  console.log("DB Path:", dbPath);
  const url = `file:${dbPath}`;
  const adapter = new PrismaBetterSqlite3({ url });
  const prisma = new PrismaClient({ adapter });
  
  prisma.branch.findMany().then(branches => {
    console.log("SUCCESS: Branches count:", branches.length);
    process.exit(0);
  }).catch(e => {
    console.error("Query Error:", e);
    process.exit(1);
  });
} catch (e) {
  console.error("Initialization Error:", e);
  process.exit(1);
}
