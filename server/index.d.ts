import fastifyJwt from "@fastify/jwt";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  }
  interface FastifyRequest {
    user: any;
  }
}
