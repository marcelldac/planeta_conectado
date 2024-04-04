import { CreateGroup } from "../interfaces/group-interface";
import PrismaGroupRepository from "../repositories/group-repository";

export class GroupUseCase {
  private groupRepository: PrismaGroupRepository;

  constructor() {
    this.groupRepository = new PrismaGroupRepository();
  }

  async create(group: CreateGroup) {
    const groupExists = await this.groupRepository.findByName(group.name);
    if (groupExists) throw new Error("Group already exists");

    return this.groupRepository.create(group);
  }

  async findAll() {
    return this.groupRepository.findAll();
  }

  async findByID(id: string) {
    return this.groupRepository.findByID(id);
  }

  async findByUser(creator_id: string) {
    const userExists = await this.groupRepository.findByUser(creator_id);
    if (!userExists) throw new Error("User not found");

    return this.groupRepository.findByUser(creator_id);
  }

  async update(group: CreateGroup, id: string) {
    const groupExists = await this.groupRepository.findByID(id);
    if (!groupExists) throw new Error("Group not found");

    return this.groupRepository.update(group, id);
  }

  async remove(id: string) {
    const group = await this.groupRepository.findByID(id);
    if (!group) throw new Error("Group not found");

    return this.groupRepository.remove(id);
  }
}
