import express, { Request, Response } from 'express';
import validateResource from '../middlewares/validateResources';
import { createUserSchema } from '../schemas/user.schema';
import { registerUser, currentUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', validateResource(createUserSchema), registerUser);

router.get('/me', currentUser);

export default router;
