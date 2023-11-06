import userRouter from "./user.router";
import authRouter from "./auth.router";
import express from "express";
const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
