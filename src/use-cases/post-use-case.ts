import { CreatePost } from "../interfaces/post-interface";
import PrismaPostRepository from "../repositories/post-repository";

export class PostUseCase {
  private postRepository: PrismaPostRepository;

  constructor() {
    this.postRepository = new PrismaPostRepository();
  }

  async create(data: CreatePost) {
    return this.postRepository.create(data);
  }

  async findAll() {
    return this.postRepository.findAll();
  }

  async findByID(id: string) {
    const result = await this.postRepository.findByID(id);
    if (!result) throw new Error("Post not found");

    return result;
  }

  async findByAuthor(author_id: string) {
    const authorPosts = await this.postRepository.findByAuthor(author_id);
    if (!authorPosts) throw new Error("Author do not have posts.");

    return authorPosts;
  }

  async update(data: CreatePost, id: string) {
    const post = await this.postRepository.findByID(id);
    if (!post) throw new Error("Post not found");

    return this.postRepository.update(data, id);
  }

  async remove(id: string) {
    const post = await this.postRepository.findByID(id);
    if (!post) throw new Error("Post not found");

    return this.postRepository.remove(id);
  }
}
