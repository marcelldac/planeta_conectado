import { FastifyInstance } from "fastify";
import { UserUseCase } from "../use-cases/user-use-case";
import { UserCreate } from "../interfaces/user-interface";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();

  fastify.get("/", async (_, reply) => {
    try {
      const data = await userUseCase.findAll();
      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
    try {
      const data = await userUseCase.findByID(req.params.id);
      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.post<{ Body: UserCreate }>("/", async (req, reply) => {
    try {
      const data = await userUseCase.create(req.body);
      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.put<{ Body: UserCreate; Params: { id: string } }>(
    "/:id",
    async (req, reply) => {
      try {
        const data = await userUseCase.update(req.body, req.params.id);
        reply.send(data);
      } catch (err) {
        reply.send(err);
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
    try {
      await userUseCase.remove(req.params.id);
      reply.send({ message: "User deleted." });
    } catch (err) {
      reply.send(err);
    }
  });
}
