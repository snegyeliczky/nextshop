import {PrismaClient} from "@prisma/client";

import {env} from "@/env";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log:
            env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


// const prisma = new PrismaClient()
//
// async function main() {
//   // ... you will write your Prisma Client queries here
// }
//
// main()
//     .then(async () => {
//       await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//       console.error(e)
//       await prisma.$disconnect()
//       process.exit(1)
//     })