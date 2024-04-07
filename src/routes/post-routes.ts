import { FastifyInstance } from "fastify";
import { PostUseCase } from "../use-cases/post-use-case";
import { CreatePost } from "../interfaces/post-interface";

export async function postRoutes(fastify: FastifyInstance) {
  const postUseCase = new PostUseCase();

  fastify.get("/", async (_, reply) => {
    try {
      const data = await postUseCase.findAll();
      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
    try {
      const data = await postUseCase.findByID(req.params.id);
      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.post<{ Body: CreatePost }>("/", async (req, reply) => {
    try {
      const data = await postUseCase.create(req.body);
      reply.send(data);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.put<{ Body: CreatePost; Params: { id: string } }>(
    "/:id",
    async (req, reply) => {
      try {
        const data = await postUseCase.update(req.body, req.params.id);
        reply.send(data);
      } catch (err) {
        reply.send(err);
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
    try {
      await postUseCase.remove(req.params.id);
      reply.send({ message: "Post deleted." });
    } catch (err) {
      reply.send(err);
    }
  });
}
