import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";

const prismaClient = new PrismaClient();

export const prismaMiddleware = fp(function (fastify, _, done) {
  fastify.decorate("prisma", prismaClient);
  done();
});
