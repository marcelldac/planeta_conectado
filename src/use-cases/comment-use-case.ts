import { CreateComment } from "../interfaces/comment-interface";
import { CreatePost } from "../interfaces/post-interface";
import PrismaCommentRepository from "../repositories/comment-repository";
import PrismaPostRepository from "../repositories/post-repository";

export class CommentUseCase {
  private commentRepository: PrismaCommentRepository;

  constructor() {
    this.commentRepository = new PrismaCommentRepository();
  }

  async create(data: CreateComment) {
    return this.commentRepository.create(data);
  }

  async findAll() {
    return this.commentRepository.findAll();
  }

  async findByID(id: string) {
    const result = await this.commentRepository.findByID(id);
    if (!result) throw new Error("Post not found");

    return result;
  }

  async update(data: CreateComment, id: string) {
    const post = await this.commentRepository.findByID(id);
    if (!post) throw new Error("Post not found");

    return this.commentRepository.update(data, id);
  }

  async remove(id: string) {
    const post = await this.commentRepository.findByID(id);
    if (!post) throw new Error("Post not found");

    return this.commentRepository.remove(id);
  }
}
