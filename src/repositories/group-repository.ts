import prisma from "../../prisma/singleton";
import {
  CreateGroup,
  Group,
  IGroupRepository,
} from "../interfaces/group-interface";

class PrismaGroupRepository implements IGroupRepository {
  async addUserInGroup(user_id: string, group_id: string): Promise<Group> {
    const result = await prisma.group.update({
      where: { id: group_id },
      data: { users: { connect: { id: user_id } } },
    });
    return result;
  }

  async removeUserFromGroup(user_id: string, group_id: string): Promise<Group> {
    const result = await prisma.group.update({
      where: { id: group_id },
      data: { users: { disconnect: { id: user_id } } },
    });
    return result;
  }

  async create(data: CreateGroup): Promise<Group> {
    const result = await prisma.group.create({ data });
    return result;
  }
  async findAll(): Promise<[] | Group[]> {
    const result = await prisma.group.findMany();
    return result;
  }
  async findByID(id: string): Promise<Group | null> {
    const result = await prisma.group.findUnique({ where: { id } });
    return result;
  }
  async findByUser(creator_id: string): Promise<Group[] | null> {
    const result = await prisma.group.findMany({ where: { creator_id } });
    return result;
  }
  async update(data: CreateGroup, id: string): Promise<Group> {
    const result = await prisma.group.update({ where: { id }, data });
    return result;
  }
  async remove(id: string): Promise<void> {
    await prisma.group.delete({ where: { id } });
  }
}

export default PrismaGroupRepository;
