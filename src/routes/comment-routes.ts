import { FastifyInstance } from "fastify";
import { CommentUseCase } from "../use-cases/comment-use-case";
import { CreateComment } from "../interfaces/comment-interface";

export async function commentRoutes(fastify: FastifyInstance) {
  const commentUseCase = new CommentUseCase();

  fastify.get("/", async (_, reply) => {
    try {
      const data = await commentUseCase.findAll();
      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
    try {
      const data = await commentUseCase.findByID(req.params.id);
      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.post<{ Body: CreateComment }>("/", async (req, reply) => {
    try {
      const data = await commentUseCase.create(req.body);
      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.put<{ Body: CreateComment; Params: { id: string } }>(
    "/:id",
    async (req, reply) => {
      try {
        const data = await commentUseCase.update(req.body, req.params.id);
        reply.send(data);
      } catch (err) {
        reply.send(err);
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
    try {
      await commentUseCase.remove(req.params.id);
      reply.send({ message: "Group deleted." });
    } catch (err) {
      reply.send(err);
    }
  });
}
