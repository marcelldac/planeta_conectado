import { User } from "./user-interface";

export interface Group {
  id: string;
  name: string;
  description: string | null;
  creator_id: string;
  created_at: Date;
  updated_at: Date;
  creator?: User;
  users?: User[];
}

export interface CreateGroup {
  name: string;
  description: string | null;
  creator_id: string;
}

export interface IGroupRepository {
  create(data: CreateGroup): Promise<Group>;
  findAll(): Promise<Group[] | []>;
  findByID(id: string): Promise<Group | null>;
  findByUser(creator_id: string): Promise<Group[] | null>;
  update(data: CreateGroup, id: string): Promise<Group>;
  remove(id: string): Promise<void>;
  addUserInGroup(user_id: string, group_id: string): Promise<Group>;
  removeUserFromGroup(user_id: string, group_id: string): Promise<Group>;
}
