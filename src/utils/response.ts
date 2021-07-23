import { ResponseMessageType } from '../base/types';

export const buildResponse = (data: any, code: number, message: string): ResponseMessageType => {
  return {
    message: message,
    data: data,
    code: code,
  };
};
