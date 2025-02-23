import jwt from "jsonwebtoken";
import { appConfig } from "../appConfig/config";

const JWT_SECRET = appConfig.SAMPLE_SECRET_JWT_KET;

const generateToken = (userId: any): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};

export { generateToken, verifyToken };
