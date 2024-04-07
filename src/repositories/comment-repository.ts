import prisma from "../../prisma/singleton";
import {
  Comment,
  CreateComment,
  ICommentRepository,
} from "../interfaces/comment-interface";
import { CreateGroup, Group } from "../interfaces/group-interface";

class PrismaCommentRepository implements ICommentRepository {
  async create(data: CreateComment): Promise<Comment> {
    return await prisma.comment.create({ data });
  }

  async findAll(): Promise<[] | Comment[]> {
    return await prisma.comment.findMany();
  }

  async findByID(id: string): Promise<Comment | null> {
    return await prisma.comment.findUnique({
      where: { id },
    });
  }

  async findByPost(post_id: string): Promise<Comment | null> {
    return await prisma.comment.findFirst({ where: { post_id } });
  }

  async findByAuthor(author_id: string): Promise<Comment[] | null> {
    return await prisma.comment.findMany({ where: { author_id } });
  }

  async update(data: CreateComment, id: string): Promise<Comment> {
    return await prisma.comment.update({ where: { id }, data });
  }
  async remove(id: string): Promise<void> {
    await prisma.comment.delete({ where: { id } });
  }
}

export default PrismaCommentRepository;
