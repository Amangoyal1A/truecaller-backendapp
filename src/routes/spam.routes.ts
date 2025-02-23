import express from "express";
import { markAsSpam } from "../controllers/spam.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateSpamRequest } from "../middleware/validation/spam.validation.middleware";

const router = express.Router();

router.post("/", authenticate, validateSpamRequest, markAsSpam);

export default router;
