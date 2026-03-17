import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";
import { scryptSync, randomBytes } from "node:crypto";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "../dev.db");

// 密碼雜湊邏輯
function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
}

async function main() {
  const email = "admin@example.com";
  const password = "adminpassword123";
  const hashedPassword = hashPassword(password);

  console.log(`Checking for admin user: ${email}`);

  try {
    const adapter = new PrismaBetterSqlite3({ url: dbPath });
    const prisma = new PrismaClient({ adapter });

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      console.log("Admin user already exists.");
    } else {
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: "Admin",
        },
      });
      console.log(`Admin user created: ${email} / ${password}`);
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
