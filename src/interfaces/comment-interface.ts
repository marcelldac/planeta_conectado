export interface Comment {
  id: string;
  text: string;
  likes: number;
  post_id: string;
}

export interface CreateComment {
  text: string;
  likes: number;
  post_id: string;
}

export interface ICommentRepository {
  create(data: CreateComment): Promise<Comment>;
  findAll(): Promise<Comment[] | []>;
  findByID(id: string): Promise<Comment | null>;
  findByPost(post_id: string): Promise<Comment | null>;
  update(data: CreateComment, id: string): Promise<Comment>;
  remove(id: string): Promise<void>;
}
