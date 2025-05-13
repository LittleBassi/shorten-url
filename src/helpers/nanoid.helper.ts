import { nanoid } from "nanoid";

export const generateCode = async (): Promise<string> => {
  return nanoid(6);
};
