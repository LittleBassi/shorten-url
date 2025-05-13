import { config } from "dotenv";
import * as jwt from "jsonwebtoken";

config();

const JWT_TOKEN = process.env.JWT_TOKEN || "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export type UserJwt = {
  id: number;
  email: string;
};

const generateToken = (user: UserJwt) => {
  const token = jwt.sign(user, JWT_TOKEN, { expiresIn: JWT_EXPIRES_IN });
  return token;
};

const validateToken = (token: string) => {
  try {
    const user = jwt.verify(token, JWT_TOKEN);
    const { id, email } = user as UserJwt;
    return { id, email };
  } catch (err) {
    return false;
  }
};

export { generateToken, validateToken };
