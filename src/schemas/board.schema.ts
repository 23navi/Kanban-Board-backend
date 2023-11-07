import { object, string, TypeOf } from 'zod';
import isValidMongodbId from '../utils/isValidMongodbId';

export const createBoardSchema = object({
  body: object({
    title: string(),
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

export const updateBoardSchema = object({
  body: object({
    title: string(),
  }),
  params: object({
    id: string().refine(isValidMongodbId, {
      message: 'Invalid Mongoose ObjectId',
    }),
  }),
});

export type UpdateBoardByIdInputParam = TypeOf<typeof updateBoardSchema>['params'];
export type UpdateBoardByIdInputBody = TypeOf<typeof updateBoardSchema>['body'];
