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

  async findAll(): Promise<User[]> {
    const result = await this.userRepository.findAll();
    return result;
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
    const verifyIfUserExists = await this.userRepository.findByID(id);
    if (!verifyIfUserExists) throw new Error("User Not Found");
    await this.userRepository.remove(id);
  }
}
