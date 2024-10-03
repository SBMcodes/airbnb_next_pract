import { PrismaClient } from "@prisma/client";

declare global {
  /* eslint no-var: off */
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// import { PrismaClient } from "@prisma/client/extension";

// // Prevent multiple instances of PrismaClient in development
// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const client = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = client;
// }

// export default client;
