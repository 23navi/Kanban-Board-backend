/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response, NextFunction } from 'express';
import { CreateUserInput } from '../schemas/user.schema';
import User from '../models/user.model';
import { ResourceAlreadyExistError } from '../errors';
import sendEmail from '../utils/mailer';
import jwt from 'jsonwebtoken';
import ejs from 'ejs';
import path from 'path';
// require("dotenv").config();

// For ejs opt validation mail, we have to enter (data= {otpValidity:number,username:string,otp:number})

const registerUser = async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new ResourceAlreadyExistError('Try other email id');
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  const ejsHtml = await ejs.renderFile(path.join(__dirname, '..', 'mails', 'activation-mail.ejs'), {
    otpValidity: 5,
    otp: 1234,
    username: newUser.name,
  });

  await sendEmail({
    from: 'navisureka23@gmail.com',
    to: newUser.email,
    subject: 'Please verify your email',
    // text: 'Test',
    html: ejsHtml,
  });

  await newUser.save();

  const getUser = await User.findById(newUser._id);

  res.status(201).json({ user: getUser });

  // This is already handled by zod
  //   if (password !== passwordConfirmation) {
  //     return res.status(400).json({ message: "Passwords do not match" });
  //   }
};
export { registerUser };

interface IValidation {
  otpValidity: string;
  otp: number;
  jwtToken: string;
}

function generateOTP() {
  // Generate a random 4-digit number
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
}
export const creeateValidation = (userEmail: string): IValidation => {
  const otp = generateOTP();
  const expiryTimeInMs = Date.now() + 5 * 60 * 1000; // 5 minutes from now
  const jwtToken = jwt.sign({ email: userEmail, otp: otp }, process.env.JWT_VALIDATION_SECRET!, {
    expiresIn: expiryTimeInMs,
  });

  return { otpValidity: '5 minutes', otp, jwtToken };
};
