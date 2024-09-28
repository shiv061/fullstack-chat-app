import { FastifyReply, FastifyRequest } from "fastify";

export const getChatUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { userId } = request.params as { userId: number };
    const { prisma } = request.server;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
      where: {
        NOT: {
          id: {
            equals: userId,
          },
        },
      },
    });
    reply.send({ users });
  } catch (error: any) {
    reply.code(500).send({ message: error?.message });
  }
};
