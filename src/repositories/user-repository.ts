import prisma from "../../prisma/singleton";
import {
  IUserRepository,
  User,
  UserCreate,
} from "../interfaces/user-interface";

class PrismaUserRepository implements IUserRepository {
  async create(data: UserCreate): Promise<User> {
    const result = await prisma.user.create({ data });
    return result;
  }

  async findAll(): Promise<User[] | []> {
    const result = await prisma.user.findMany();
    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: { email },
    });

    return result || null;
  }

  async findByID(id: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: { id },
    });

    return result || null;
  }

  async update(data: UserCreate, id: string): Promise<User> {
    const result = await prisma.user.update({
      where: { id },
      data,
    });

    return result;
  }

  async remove(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}

export default PrismaUserRepository;
