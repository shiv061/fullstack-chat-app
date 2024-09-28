import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";

export async function signupController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { username, email, password } = request.body as {
      username: string;
      email: string;
      password: string;
    };
    const { prisma } = request.server;

    const hasUser = await prisma.user.findFirst({
      select: { id: true },
      where: { email },
    });

    if (hasUser?.id) {
      reply.code(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        refreshToken: "",
      },
    });

    reply
      .code(201)
      .send({ message: "User successfully created", userId: user.id });
  } catch (error) {
    reply.code(400).send({ message: "Error creating user" });
  }
}

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    const { prisma, jwt } = request.server;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return reply.code(401).send({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user?.password);

    if (!isValidPassword) {
      return reply.code(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId: user.id }, { expiresIn: "7d" });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken,
      },
    });

    reply.send({
      id: user.id,
      username: user.username,
      email: user.email,
      token,
      refreshToken,
    });
  } catch (error) {
    reply.code(400).send({ message: "Error creating user" });
  }
}

export const refreshTokenController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { refreshToken } = request.body as { refreshToken: string };
  const { prisma, jwt } = request.server;

  try {
    const isRefreshTokenPresent = await prisma.user.count({
      where: {
        refreshToken,
      },
    });

    if (!isRefreshTokenPresent) {
      reply.code(401).send({ message: "Invalid credentials" });
    }

    const decoded = jwt.verify(refreshToken) as any;
    const userId = decoded.userId;

    const newAccessToken = jwt.sign({ userId }, { expiresIn: "15m" });

    reply.send({ token: newAccessToken });
  } catch (error) {
    reply.code(500).send({ error: "Error refreshing token" });
  }
};
