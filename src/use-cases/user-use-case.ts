import { User, UserCreate } from "../interfaces/user-interface";
import PrismaUserRepository from "../repositories/user-repository";

export class UserUserCase {
  private userRepository: PrismaUserRepository;

  constructor() {
    this.userRepository = new PrismaUserRepository();
  }

  async create({ name, email, password }: UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findByEmail(email);
    if (verifyIfUserExists) throw new Error("User Already Exists");

    const result = await this.userRepository.create({ name, email, password });
    return result;
  }

  async findByID(id: string): Promise<User | null> {
    const result = await this.userRepository.findByID(id);
    return result;
  }

  async update(data: UserCreate, id: string): Promise<User> {
    const result = await this.userRepository.update(data, id);
    return result;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.remove(id);
  }
}
