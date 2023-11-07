import { object, string, TypeOf } from 'zod';
import isValidMongodbId from '../utils/isValidMongodbId';

export const createBoardSchema = object({
  body: object({}),
  params: object({
    id: string(),
  }),
});

export type CreateBoardSchemaInput = TypeOf<typeof createBoardSchema>['body'];

export const getBoardByIdSchema = object({
  params: object({
    id: string().refine(isValidMongodbId, {
      message: 'Invalid Mongoose ObjectId',
    }),
  }),
});

export type GetBoardByIdInput = TypeOf<typeof getBoardByIdSchema>['params'];
