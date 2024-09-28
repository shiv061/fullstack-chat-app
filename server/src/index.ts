import fastify from "fastify";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";

const server = fastify();

server.register(cors, {
  origin: "*",
});

server.register(websocket);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(0);
  }
  console.log(`Server listining at ${address}`);
});
