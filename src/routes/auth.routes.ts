import express from "express";
import { register, login } from "../controllers/auth.controller";
import { validateRegisterRequest } from "../middleware/validation/register.validation.middleware";
import { validateLoginRequest } from "../middleware/validation/login.validation.middleware";

const router = express.Router();

router.post("/register", validateRegisterRequest, register);
router.post("/login", validateLoginRequest, login);

export default router;
