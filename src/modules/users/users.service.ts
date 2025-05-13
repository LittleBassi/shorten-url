import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  getHexPassword,
  samePassword,
  validatePassword,
} from "../../helpers/password.helper";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(protected readonly usersRepository: UsersRepository) {}

  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async create(dto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOneByEmail(
      dto.email,
    );
    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }
    const user = this.usersRepository.create(dto);
    const passErrors = validatePassword(dto.password);
    if (passErrors.length > 0) {
      throw new UnprocessableEntityException({ password: passErrors });
    }
    user.password = await getHexPassword(dto.password);
    const { password, ...result } = await this.usersRepository.update(user);
    return result;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    try {
      if (dto.email) {
        const existingUser = await this.usersRepository.findOneByEmail(
          dto.email,
        );
        if (existingUser && existingUser.id !== user.id) {
          throw new BadRequestException("Email already exists");
        }
        user.email = dto.email;
      }
      if (dto.password) {
        const passErrors = validatePassword(dto.password);
        if (passErrors.length > 0) {
          throw new UnprocessableEntityException({ password: passErrors });
        }
        if (await samePassword(user.password, dto.password)) {
          throw new UnprocessableEntityException({
            password: [
              "The new password can not be the same of the current one.",
            ],
          });
        }
        user.password = await getHexPassword(dto.password);
      }
      return this.usersRepository.update(user);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return await this.usersRepository.delete(user);
  }
}
