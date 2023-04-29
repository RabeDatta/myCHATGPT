//@ts-nocheck
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any; // Replace "any" with the actual type of your user object
}

export const verifyCookieToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Entering verifyCookieToken middleware");

  try {
    console.log("Entering try block");
    // console.log("req object:", req);
    console.log("req.cookies:", req.cookies);
    console.log("token 123", req.cookies.access_token);

    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).json({ error: "Access Denied" });
    }
    console.log("token 123", token);
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET as string);
      console.log("verified", verified);
      req.user = verified;
      next();
    } catch (err) {
      res.status(403).send("Access Denied");
    }
  } catch (err: any) {
    if (
      err instanceof jwt.JsonWebTokenError ||
      err instanceof jwt.TokenExpiredError
    ) {
      res.status(401).send("Unauthorized");
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};
