/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response, NextFunction } from 'express';

const getAllBoards = async (req: Request, res: Response, next: NextFunction) => {
  // We will get board for currently logged in user, we don't need to take in userId as input
  return res.send('All Boards for the give user');
};

const getBoardById = async (req: Request, res: Response, next: NextFunction) => {
  return res.send('Board with id ' + req.params.id);
};

export { getAllBoards, getBoardById };
