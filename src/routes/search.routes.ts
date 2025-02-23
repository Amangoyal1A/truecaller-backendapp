import express from "express";
import { searchByName, searchByPhoneNumber } from "../controllers/search.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/name", authenticate, searchByName);
router.get("/phone", authenticate, searchByPhoneNumber);

export default router;
