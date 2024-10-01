import { FastifyRequest } from "fastify";
import { WebSocket } from "ws";

const connections = new Map<string, WebSocket>();

export const chatController = async (
  socket: WebSocket,
  request: FastifyRequest
) => {
  try {
    const { userId } = request.params as { userId: string };
    const { prisma } = request.server;

    connections.set(userId, socket);

    socket.on("message", async (message) => {
      const { type, content, receiverId } = JSON.parse(message.toString());

      if (type === "chat") {
        const stored = await prisma.message.create({
          data: {
            content,
            receiverId: +receiverId,
            senderId: +userId,
          },
        });

        const receiverSocket = connections.get(receiverId);
        if (receiverSocket && receiverSocket.readyState === 1) {
          receiverSocket.send(JSON.stringify(stored));
        }

        socket.send(JSON.stringify(stored));
      }
    });

    socket.on("close", () => {
      connections.delete(userId);
    });
  } catch (error) {}
};
