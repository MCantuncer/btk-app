import { Static, Type } from '@sinclair/typebox';

export const ErrorMessage = Type.Object({
  message: Type.String(),
});

export type ErrorMessageType = Static<typeof ErrorMessage>;

export const ResponseMessage = Type.Object({
  code: Type.Number(),
  message: Type.String(),
  data: Type.Optional(Type.Any()),
});

export type ResponseMessageType = Static<typeof ResponseMessage>;
