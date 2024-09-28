import fastify from "fastify";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";
import { authRoute } from "./routes/auth.route.";
import { prismaMiddleware } from "./middleware/prismaMiddleware";
import jsonwebtoken from "@fastify/jwt";
import { userRoute } from "./routes/user.route";

const server = fastify();

server.register(cors, {
  origin: "*",
});

server.register(websocket);

// middleware
server.register(jsonwebtoken, { secret: process.env.JWT_SECRET! });
server.register(prismaMiddleware);

// routes
server.register(authRoute, { prefix: "/api/auth" });
server.register(userRoute, { prefix: "/api/users" });

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(0);
  }
  console.log(`Server listening at ${address}`);
});
