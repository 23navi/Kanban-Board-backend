/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response, NextFunction } from 'express';
import {
  GetBoardByIdInput,
  CreateBoardSchemaInput,
  UpdateBoardByIdInputParam,
  UpdateBoardByIdInputBody,
  DeleteBoardByIdInputParam,
} from '../schemas/board.schema';

const getAllBoards = async (req: Request, res: Response, next: NextFunction) => {
  // We will get board for currently logged in user, we don't need to take in userId as input
  return res.send('All Boards for the give user');
};

const getBoardById = async (req: Request<GetBoardByIdInput>, res: Response, next: NextFunction) => {
  return res.send('Board with id ' + req.params.id);
};

const createBoard = async (req: Request<{}, {}, CreateBoardSchemaInput>, res: Response, next: NextFunction) => {
  return res.send('New board with title = ' + req.body.title);
};

const updateBoard = async (
  req: Request<UpdateBoardByIdInputParam, {}, UpdateBoardByIdInputBody>,
  res: Response,
  next: NextFunction,
) => {
  return res.send('Updated board with title = ' + req.body.title + 'and id = ' + req.params.id);
};

const deleteBoard = async (req: Request<DeleteBoardByIdInputParam>, res: Response, next: NextFunction) => {
  return res.send('Delete board with id ' + req.params.id);
};

export { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };
