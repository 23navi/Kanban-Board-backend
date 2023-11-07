import express from 'express';
const router = express.Router();
import validateRequest from '../middlewares/validateResources';
import { getBoardByIdSchema } from '../schemas/board.schema';

import { getAllBoards, getBoardById } from '../controllers/board.controller';
import requireAuth from '../middlewares/requireAuth';

router.get('/', requireAuth, getAllBoards);
router.get('/:id', requireAuth, validateRequest(getBoardByIdSchema), getBoardById);

export default router;
