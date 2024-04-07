export interface Post {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  likes: number;
  is_report: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreatePost {
  title: string;
  description: string;
  image_url: string | null;
  likes: number;
  is_report: boolean;
  author_id: string;
}

export interface IPostRepository {
  create(data: CreatePost): Promise<Post>;
  findAll(): Promise<Post[] | []>;
  findByID(id: string): Promise<Post | null>;
  findByAuthor(author_id: string): Promise<Post[] | null>;
  update(data: CreatePost, id: string): Promise<Post>;
  remove(id: string): Promise<void>;
}
