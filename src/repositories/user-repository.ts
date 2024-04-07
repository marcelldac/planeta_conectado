import prisma from "../../prisma/singleton";
import {
  IUserRepository,
  User,
  UserCreate,
} from "../interfaces/user-interface";

class PrismaUserRepository implements IUserRepository {
  async create(data: UserCreate): Promise<User> {
    return await prisma.user.create({ data });
  }

  async findAll(): Promise<User[] | []> {
    return await prisma.user.findMany({
      include: {
        created_groups: true,
        groups: true,
        posts: true,
        _count: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { email },
      include: {
        created_groups: true,
        groups: true,
        posts: true,
        _count: true,
      },
    });
  }

  async findByID(id: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { id },
      include: {
        created_groups: true,
        groups: true,
        posts: true,
        _count: true,
      },
    });
  }

  async update(data: UserCreate, id: string): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}

export default PrismaUserRepository;
