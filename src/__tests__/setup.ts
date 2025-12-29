import { app, prisma } from '../app';

export { app, prisma };

export async function setupTestDB() {
  await prisma.$connect();
}

export async function cleanupTestDB() {
  await prisma.$disconnect();
}
