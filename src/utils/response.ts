import { ResponseMessageType } from '../base/types';

export const loginResponse = (user: any, code: number, message: string): ResponseMessageType => {
  return {
    message: message,
    data: user,
    code: code,
  };
};
