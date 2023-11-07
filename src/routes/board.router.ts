import express from 'express';
const router = express.Router();
import validateRequest from '../middlewares/validateResources';
import { getBoardByIdSchema, createBoardSchema, updateBoardSchema, deleteBoardSchema } from '../schemas/board.schema';

import { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard } from '../controllers/board.controller';
import requireAuth from '../middlewares/requireAuth';

router.get('/', requireAuth, getAllBoards);
router.get('/:id', requireAuth, validateRequest(getBoardByIdSchema), getBoardById);
router.post('/', requireAuth, validateRequest(createBoardSchema), createBoard);
router.patch('/:id', requireAuth, validateRequest(updateBoardSchema), updateBoard);
router.delete('/:id', requireAuth, validateRequest(deleteBoardSchema), deleteBoard);

export default router;
