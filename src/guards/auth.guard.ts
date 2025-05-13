import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { validateToken } from "../helpers/jwt.helper";

export const AUTH_REQUIRED_KEY = "auth_required";

export const AuthRequired = (required: boolean = true) =>
  SetMetadata(AUTH_REQUIRED_KEY, required);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required =
      this.reflector.getAllAndOverride<boolean>(AUTH_REQUIRED_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? true;

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      if (required) throw new UnauthorizedException("No token provided");
      return true;
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = validateToken(token);
    if (!decoded) {
      if (required) throw new UnauthorizedException("Invalid token");
      return true;
    }

    request.user = decoded;
    return true;
  }
}
