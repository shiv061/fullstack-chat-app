import { FastifyInstance } from "fastify";
import {
  loginController,
  refreshTokenController,
  signupController,
} from "../controller/auth.controller";
import { verifyJWT } from "../middleware/verifyJwt";

export const authRoute = async (app: FastifyInstance) => {
  app.route({
    method: "POST",
    url: "/signup",
    schema: {
      body: {
        type: "object",
        properties: {
          username: {
            type: "string",
            minLength: 6,
          },
          email: {
            type: "string",
            minLength: 6,
          },
          password: {
            type: "string",
            minLength: 6,
          },
        },
        required: ["username", "email", "password"],
      },
    },
    handler: signupController,
  });

  app.route({
    method: "POST",
    url: "/login",
    schema: {
      body: {
        type: "object",
        properties: {
          email: {
            type: "string",
            minLength: 6,
          },
          password: {
            type: "string",
            minLength: 6,
          },
        },
        required: ["email", "password"],
      },
    },
    handler: loginController,
  });

  app.route({
    method: "POST",
    url: "/refresh",
    schema: {
      body: {
        type: "object",
        properties: {
          refreshToken: {
            type: "string",
          },
        },
        required: ["refreshToken"],
      },
    },
    handler: refreshTokenController,
  });
};
