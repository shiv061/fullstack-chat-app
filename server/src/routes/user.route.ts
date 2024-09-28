import { FastifyInstance } from "fastify";
import { getChatUsers } from "../controller/user.controller";
import { verifyJWT } from "../middleware/verifyJwt";

export const userRoute = async (app: FastifyInstance) => {
  app.route({
    method: "GET",
    url: "/:userId",
    schema: {
      params: {
        type: "object",
        properties: {
          userId: {
            type: "number",
          },
        },
      },
    },
    preHandler: [verifyJWT],
    handler: getChatUsers,
  });
};
