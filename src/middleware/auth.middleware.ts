import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

const authenticate = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  try {
    const decoded = verifyToken(token);
    req["userId"] = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export { authenticate };
