import { Roles } from "./roles.entity.js";

export class RolesService {
  public async findAll(): Promise<Roles[] | undefined> {
    return;
  }

  public async findOne(item: { id: string }): Promise<Roles | undefined> {
    return;
  }
}
