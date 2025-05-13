import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { samePassword } from "../../helpers/password.helper";
import { generateToken } from "../../helpers/jwt.helper";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(protected usersRepository: UsersRepository) {}

  async login(loginDto: LoginDto) {
    try {
      const email = loginDto.email;
      const user = await this.usersRepository.findOneByEmail(email);
      if (user) {
        const samePass = await samePassword(user.password, loginDto.password);
        if (samePass) {
          const userJwt = {
            id: user.id,
            email: user.email,
          };
          const token = generateToken(userJwt);
          const loggedUser = {
            id: user.id,
            email: user.email,
            token,
          };
          return loggedUser;
        }
      }
      throw new BadRequestException("Invalid email or password.");
    } catch (err) {
      throw err;
    }
  }
}
