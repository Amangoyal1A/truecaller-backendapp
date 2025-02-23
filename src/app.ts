import express, { Application } from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";
import contactRoutes from "./routes/contact.routes";
import searchRoutes from "./routes/search.routes";
import spamRoutes from "./routes/spam.routes";

export const app: Application = express();

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/spam", spamRoutes);

