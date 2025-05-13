import {
  DeepPartial,
  FindManyOptions,
  In,
  ILike,
  Repository,
  Raw,
} from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(options: FindManyOptions<User> = {}) {
    return this.usersRepository.find(options);
  }
  async findOne(id: number, options: FindManyOptions<User> = {}) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
      ...options,
    });
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }

  create(user: DeepPartial<User> = {}) {
    return this.usersRepository.create(user);
  }

  async update(user: DeepPartial<User>) {
    return this.usersRepository.save(user);
  }

  async delete(user: DeepPartial<User>) {
    return this.usersRepository.softRemove(user);
  }
}
