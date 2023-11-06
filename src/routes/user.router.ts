import express, { Request, Response } from "express";
import validateResource from "../middlewares/validateResources";
import { createUserSchema } from "../schemas/user.schema";
import { registerUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", validateResource(createUserSchema), registerUser);

export default router;
