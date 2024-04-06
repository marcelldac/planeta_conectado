import { User, UserCreate } from "../interfaces/user-interface";
import PrismaUserRepository from "../repositories/user-repository";

export class UserUseCase {
  private userRepository: PrismaUserRepository;

  constructor() {
    this.userRepository = new PrismaUserRepository();
  }

  async create({ name, email, password }: UserCreate): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (user) throw new Error("User Already Exists");

    return await this.userRepository.create({ name, email, password });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findByID(id: string): Promise<User | null> {
    const result = await this.userRepository.findByID(id);
    if (!result) throw new Error("User Not Found");

    return result;
  }

  async update(data: UserCreate, id: string): Promise<User> {
    const user = await this.userRepository.findByID(id);
    if (!user) throw new Error("User Not Found");

    return await this.userRepository.update(data, id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findByID(id);
    if (!user) throw new Error("User Not Found");

    await this.userRepository.remove(id);
  }
}
