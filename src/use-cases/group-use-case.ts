import { CreateGroup } from "../interfaces/group-interface";
import PrismaGroupRepository from "../repositories/group-repository";
import PrismaUserRepository from "../repositories/user-repository";

export class GroupUseCase {
  private groupRepository: PrismaGroupRepository;
  private userRepository: PrismaUserRepository;

  constructor() {
    this.groupRepository = new PrismaGroupRepository();
    this.userRepository = new PrismaUserRepository();
  }

  async addUserInGroup(user_id: string, group_id: string) {
    const user = await this.userRepository.findByID(user_id);
    if (!user) throw new Error("User not found");

    const group = await this.groupRepository.findByID(group_id);
    if (!group) throw new Error("Group not found");

    if (group.creator!.id === user_id) {
      throw new Error(
        "User is the creator of the group. He's already in the group."
      );
    }

    group.users!.map((user) => {
      if (user.id === user_id) {
        throw new Error("User is already in the group");
      }
    });

    return this.groupRepository.addUserInGroup(user_id, group_id);
  }

  async removeUserFromGroup(user_id: string, group_id: string) {
    const user = await this.userRepository.findByID(user_id);
    if (!user) throw new Error("User not found");

    const group = await this.groupRepository.findByID(group_id);
    if (!group) throw new Error("Group not found");

    if (group.creator!.id === user_id) {
      throw new Error(
        "User is the creator of the group. Delete the group if you want to exit."
      );
    }

    if (group.users?.length === 0) {
      throw new Error("Group has no users to remove");
    }

    group.users!.map((user) => {
      if (user.id !== user_id) {
        throw new Error("User is not in the group");
      }
    });

    return this.groupRepository.removeUserFromGroup(user_id, group_id);
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
    const user = await this.groupRepository.findByUser(creator_id);
    if (!user) throw new Error("User not found");

    return user;
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
