//@ts-nocheck
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    console.log({
      username,
      email,
      password,
    });
    const exisitingEmail = await User.findOne({ email });
    console.log(exisitingEmail);
    if (exisitingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User does not exist." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

  res
    .cookie("access_token", token, {
      httpOnly: true,
      maxAge: 3600000,
    })
    .status(200)
    .json({
      msg: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
};

const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.access_token)
    return res.status(204).json({ msg: "User not logged in." });

  try {
    res
      .clearCookie("access_token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        message: "User has been logged out!",
      });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

const userStatus = (req: Request, res: Response) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
};

export { register, login, logout, userStatus };
