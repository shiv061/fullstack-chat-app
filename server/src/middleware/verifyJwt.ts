import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export const verifyJWT = function (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {
  try {
    const { authorization } = request.headers;
    const token = authorization?.split(" ")[1];

    if (token) {
      const decoded = request.server.jwt.verify(token) as any;
      request.user = decoded;
    }
    done();
  } catch (error) {
    reply.code(401).send({ message: "Token expired" });
  }
};
