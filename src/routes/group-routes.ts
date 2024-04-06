import { FastifyInstance } from "fastify";
import { GroupUseCase } from "../use-cases/group-use-case";
import { CreateGroup } from "../interfaces/group-interface";

export async function groupRoutes(fastify: FastifyInstance) {
  const groupUseCase = new GroupUseCase();

  fastify.get("/", async (_, reply) => {
    try {
      const data = await groupUseCase.findAll();
      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
    try {
      const data = await groupUseCase.findByID(req.params.id);
      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.post<{ Body: CreateGroup }>("/", async (req, reply) => {
    try {
      const data = await groupUseCase.create(req.body);
      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.put<{ Body: CreateGroup; Params: { id: string } }>(
    "/:id",
    async (req, reply) => {
      try {
        const data = await groupUseCase.update(req.body, req.params.id);
        reply.send(data);
      } catch (err) {
        reply.send(err);
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
    try {
      await groupUseCase.remove(req.params.id);
      reply.send({ message: "Group deleted." });
    } catch (err) {
      reply.send(err);
    }
  });
}
