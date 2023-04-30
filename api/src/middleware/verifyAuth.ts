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

    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("verified", verified);

    // Check for the expiration date in the payload
    const currentTimestamp = Math.floor(Date.now() / 1000);

    console.log("currentTimestamp", currentTimestamp);
    console.log("verified.exp", verified.exp);

    // if (verified.exp && currentTimestamp > verified.exp) {
    //   return res.status(401).json({ error: "Token has expired" });
    // }

    req.user = verified;
    next();
  } catch (err: any) {
    if (
      err instanceof jwt.JsonWebTokenError ||
      err instanceof jwt.TokenExpiredError
    ) {
      // res.status(401).json({ error: "Unauthorized" });
      res
        .status(401)
        .clearCookie("access_token", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json({
          message: "User has been logged out!",
        });
    } else {
      // Add this else block
      res.status(500).json({ error: "Server Error" });
    }
  }
};
