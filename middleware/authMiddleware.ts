import { verify } from "../utils/jwtUtil";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const user = verify(token);
      req.user = user;
      next();
    } catch (err) {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
};
