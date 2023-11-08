/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response, NextFunction } from 'express';
import {
  GetBoardByIdInput,
  CreateBoardSchemaInput,
  UpdateBoardByIdInputParam,
  UpdateBoardByIdInputBody,
  DeleteBoardByIdInputParam,
} from '../schemas/board.schema';
import Board from '../models/board.modle';
import { NotFoundError } from '../errors';

const getAllBoards = async (req: Request, res: Response, next: NextFunction) => {
  // We will get board for currently logged in user, we don't need to take in userId as input
  const { _id: userId } = res.locals.user;
  const boards = await Board.find({ _id: userId });
  return res.send(boards);
};

const getBoardById = async (req: Request<GetBoardByIdInput>, res: Response, next: NextFunction) => {
  return res.send('Board with id ' + req.params.id);
};

const createBoard = async (req: Request<{}, {}, CreateBoardSchemaInput>, res: Response, next: NextFunction) => {
  // When we create a board, we should create 3 column and add that to this board, and owner of the column will be owner of board by default
  const board = Board.build({
    title: req.body.title,
    user: res.locals.user._id,
  });
  await board.save();
  return res.send(board);
};

const updateBoard = async (
  req: Request<UpdateBoardByIdInputParam, {}, UpdateBoardByIdInputBody>,
  res: Response,
  next: NextFunction,
) => {
  const board = await Board.findById(req.params.id);
  if (!board) {
    throw new NotFoundError('Board not Found');
  }
  return res.send('Updated board with title = ' + req.body.title + 'and id = ' + req.params.id);
};

const deleteBoard = async (req: Request<DeleteBoardByIdInputParam>, res: Response, next: NextFunction) => {
  return res.send('Delete board with id ' + req.params.id);
};

export { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };
