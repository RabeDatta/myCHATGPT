import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log(`Connected to database`);
  } catch (error) {
    console.log(`Database connection error: ${error}`);
  }
};

export { connectDB, prisma };
