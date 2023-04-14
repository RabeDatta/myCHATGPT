import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any; // Replace "any" with the actual type of your user object
}

export const verifyCookieToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = verified;
    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
