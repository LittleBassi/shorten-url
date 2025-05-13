import { nanoid } from 'nanoid';


export const generateCode = async (): Promise<string> => {
//   const { nanoid } = await import('nanoid');
  return nanoid(6);
}