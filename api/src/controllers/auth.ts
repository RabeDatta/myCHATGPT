import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";

import NodeCache from "node-cache";
const userCache = new NodeCache();

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    console.log({
      username,
      email,
      password,
    });

    const exisitingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log(exisitingEmail);
    if (exisitingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordHash,
      },
    });

    console.log("new users:- ", newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return res.status(400).json({ msg: "User does not exist." });

  const expiresIn = 24 * 60 * 60; // 1 day in seconds
  const expiration = Math.floor(Date.now() / 1000) + expiresIn;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

  const token = jwt.sign(
    { id: user.id, exp: expiration },
    process.env.JWT_SECRET as string
  );
  const oneDayToMilliseconds = 24 * 60 * 60 * 1000; // 24 hour in milliseconds

  const isProduction = process.env.NODE_ENV === "production";

  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: isProduction,
      maxAge: oneDayToMilliseconds,
    })
    .status(200)
    .json({
      msg: "User logged in successfully",
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

const userStatus = async (req: Request, res: Response) => {
  try {
    /* @ts-ignore */
    const { id } = req.user;

    const cacheKey = `userStatus-${id}`;

    // Try to get the cached user status
    const cachedUserStatus = userCache.get(cacheKey);

    if (cachedUserStatus) {
      // If the user status is cached, return the cached value
      return res.status(200).json(cachedUserStatus);
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res
        .clearCookie("access_token", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .status(404)
        .json({ error: "User does not exist." });
    }

    const { username, email } = user;

    const userStatusResponse = {
      isAuthenticated: true,
      user: {
        username,
        email,
      },
    };

    // Cache the user status with an expiration time (in seconds)
    const cacheExpiration = 90; // 1m 30s
    userCache.set(cacheKey, userStatusResponse, cacheExpiration);

    res.status(200).json(userStatusResponse);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export { register, login, logout, userStatus };
