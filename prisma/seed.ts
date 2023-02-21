import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "test@test.com",
        name: "Test Test",
        id: "0",
      },
      {
        email: "example@example.com",
        name: "Example Example",
        id: "1",
      },
      {
        email: "example2@example.com",
        name: "Example Example2",
        id: "2",
      },
    ],
    skipDuplicates: true,
  });
  await prisma.emailToken.deleteMany();
  await prisma.emailToken.createMany({
    data: [
      {
        userId: "0",
        token: "0",
      },
      {
        userId: "1",
        token: "1",
      },
      {
        userId: "2",
        token: "2",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
