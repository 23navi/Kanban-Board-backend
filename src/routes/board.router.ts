import express from 'express';
const router = express.Router();
import validateRequest from '../middlewares/validateResources';
import { getBoardByIdSchema, createBoardSchema } from '../schemas/board.schema';

import { getAllBoards, getBoardById, createBoard } from '../controllers/board.controller';
import requireAuth from '../middlewares/requireAuth';

router.get('/', requireAuth, getAllBoards);
router.get('/:id', requireAuth, validateRequest(getBoardByIdSchema), getBoardById);
router.post('/', requireAuth, validateRequest(createBoardSchema), createBoard);

export default router;
