import { object, string, TypeOf, date } from 'zod';
import isValidMongodbId from '../utils/isValidMongodbId';

export const createColumnSchema = object({
  body: object({
    title: string(),
    dueDate: date().optional(),
  }),
  params: object({
    boardId: string().refine(isValidMongodbId, {
      message: 'Invalid Mongoose ObjectId',
    }),
  }),
});

export type CreateColumnSchemaInputBody = TypeOf<typeof createColumnSchema>['body'];

export const getColumnByIdSchema = object({
  params: object({
    id: string().refine(isValidMongodbId, {
      message: 'Invalid Mongoose ObjectId',
    }),
  }),
});

export type GetColumnByIdInput = TypeOf<typeof getColumnByIdSchema>['params'];

export const updateColumnSchema = object({
  body: object({
    title: string(),
    dueDate: date().optional(),
  }),
  params: object({
    id: string().refine(isValidMongodbId, {
      message: 'Invalid Mongoose ObjectId',
    }),
  }),
});

export type UpdateColumnByIdInputParam = TypeOf<typeof updateColumnSchema>['params'];
export type UpdateColumnByIdInputBody = TypeOf<typeof updateColumnSchema>['body'];

export const deleteColumnSchema = object({
  params: object({
    id: string().refine(isValidMongodbId, {
      message: 'Invalid Mongoose ObjectId',
    }),
  }),
});

export type DeleteColumnByIdInputParam = TypeOf<typeof deleteColumnSchema>['params'];
