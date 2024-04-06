import { CreateGroup } from "../interfaces/group-interface";
import PrismaGroupRepository from "../repositories/group-repository";

export class GroupUseCase {
  private groupRepository: PrismaGroupRepository;

  constructor() {
    this.groupRepository = new PrismaGroupRepository();
  }

  async create(data: CreateGroup) {
    const group = await this.groupRepository.findByName(data.name);
    if (group) throw new Error("Group already exists");

    const user = await this.userRepository.findByID(data.creator_id);
    if (!user) throw new Error("User not found");

    return this.groupRepository.create(data);
  }

  async findAll() {
    return this.groupRepository.findAll();
  }

  async findByID(id: string) {
    const result = await this.groupRepository.findByID(id);
    if (!result) throw new Error("Group not found");

    return result;
  }

  async findByUser(creator_id: string) {
    const userExists = await this.groupRepository.findByUser(creator_id);
    if (!userExists) throw new Error("User not found");

    return this.groupRepository.findByUser(creator_id);
  }

  async update(data: CreateGroup, id: string) {
    const groupExists = await this.groupRepository.findByID(id);
    if (!groupExists) throw new Error("Group not found");

    return this.groupRepository.update(data, id);
  }

  async remove(id: string) {
    const group = await this.groupRepository.findByID(id);
    if (!group) throw new Error("Group not found");

    return this.groupRepository.remove(id);
  }
}
