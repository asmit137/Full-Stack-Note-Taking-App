import { Request, Response } from "express";
import Userdeloite from "../models/User";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const sendOtp = async (req: Request, res: Response) => {
  const { email, name, dateOfBirth } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  await Userdeloite.findOneAndUpdate(
    { email },
    { email, name, dateOfBirth, otp, otpExpires },
    { upsert: true }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Note App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP",
    text: `Your OTP is: ${otp}`,
  });

  res.json({ message: "OTP sent" });
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const user = await Userdeloite.findOne({ email });

  if (
    !user ||
    user.otp !== otp ||
    !user.otpExpires ||
    new Date(user.otpExpires).getTime() < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  

  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  const token = jwt.sign({ id: user._id, email: user.email,
    name: user.name, }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  res.json({ token });
};

export const googleLogin = async (req: Request, res: Response) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) return res.status(400).json({ message: "Invalid Google token" });

    const { email, name, sub: googleId } = payload;

    const user = await Userdeloite.findOneAndUpdate(
      { email },
      { name, googleId },
      { upsert: true, new: true }
    );

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Google login failed" });
  }
};
