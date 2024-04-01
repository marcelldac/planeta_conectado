export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUserRepository {
  create(data: UserCreate): Promise<User>;
  findAll(): Promise<User[] | []>;
  findByEmail(email: string): Promise<User | null>;
  findByID(id: string): Promise<User | null>;
  update(data: UserCreate, id: string): Promise<User>;
  remove(id: string): Promise<void>;
}
