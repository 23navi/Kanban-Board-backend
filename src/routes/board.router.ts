import express from 'express';
const router = express.Router();
import validateRequest from '../middlewares/validateResources';

import { getAllBoards } from '../controllers/board.controller';
import requireAuth from '../middlewares/requireAuth';

router.get('/', requireAuth, getAllBoards);

export default router;
