import { UserJwt } from "../../helpers/jwt.helper";

declare global {
  namespace Express {
    interface Request {
      user?: UserJwt;
    }
  }
}
