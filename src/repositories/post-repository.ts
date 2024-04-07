import prisma from "../../prisma/singleton";
import {
  CreatePost,
  IPostRepository,
  Post,
} from "../interfaces/post-interface";

class PrismaPostRepository implements IPostRepository {
  async create(data: CreatePost): Promise<Post> {
    return await prisma.post.create({ data });
  }

  async findAll(): Promise<Post[] | []> {
    return await prisma.post.findMany();
  }

  async findByID(id: string): Promise<Post | null> {
    return await prisma.post.findUnique({
      where: { id },
    });
  }

  async findByAuthor(author_id: string): Promise<Post[] | null> {
    return await prisma.post.findMany({ where: { author_id } });
  }

  async update(data: CreatePost, id: string): Promise<Post> {
    return await prisma.post.update({ where: { id }, data });
  }

  async remove(id: string): Promise<void> {
    await prisma.post.delete({ where: { id } });
  }
}

export default PrismaPostRepository;
