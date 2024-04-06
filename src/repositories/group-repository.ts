import prisma from "../../prisma/singleton";
import {
  CreateGroup,
  Group,
  IGroupRepository,
} from "../interfaces/group-interface";

class PrismaGroupRepository implements IGroupRepository {
  async addUserInGroup(user_id: string, group_id: string): Promise<Group> {
    return await prisma.group.update({
      where: { id: group_id },
      data: { users: { connect: { id: user_id } } },
    });
  }

  async removeUserFromGroup(user_id: string, group_id: string): Promise<Group> {
    return await prisma.group.update({
      where: { id: group_id },
      data: { users: { disconnect: { id: user_id } } },
    });
  }

  async create(data: CreateGroup): Promise<Group> {
    return await prisma.group.create({ data });
  }
  async findAll(): Promise<[] | Group[]> {
    return await prisma.group.findMany({
      include: { creator: true, users: true, posts: true, _count: true },
    });
  }
  async findByID(id: string): Promise<Group | null> {
    return await prisma.group.findUnique({
      where: { id },
      include: { creator: true, users: true, posts: true, _count: true },
    });
  }
  async findByUser(creator_id: string): Promise<Group[] | null> {
    return await prisma.group.findMany({ where: { creator_id } });
  }
  async findByName(name: string): Promise<Group | null> {
    return await prisma.group.findFirst({ where: { name } });
  }
  async update(data: CreateGroup, id: string): Promise<Group> {
    return await prisma.group.update({ where: { id }, data });
  }
  async remove(id: string): Promise<void> {
    await prisma.group.delete({ where: { id } });
  }
}

export default PrismaGroupRepository;
