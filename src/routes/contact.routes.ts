import express from "express";
import { getContacts, addContact } from "../controllers/contact.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateContactRequest } from "../middleware/validation/contact.validation.middleware";

const router = express.Router();

router.get("/", authenticate, getContacts);
router.post("/", authenticate,validateContactRequest, addContact);

export default router;
