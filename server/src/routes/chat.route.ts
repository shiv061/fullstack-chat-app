import { FastifyInstance } from "fastify";
import { chatController } from "../controller/chat.controller";
import { verifyJWT } from "../middleware/verifyJwt";

export async function chatRoute(app: FastifyInstance) {
  app.get(
    "/:userId",
    { websocket: true, preHandler: [verifyJWT] },
    chatController
  );
}
