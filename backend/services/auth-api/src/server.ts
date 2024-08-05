import express from "express";
import serverless from "serverless-http";
import { createUser, generatePasswordResetCode, loginUser, resetPassword, verifyUser } from "./handler";
import { applyMiddleware } from "../../../middleware/corsConfig";

const app = express();
const origin = "http://localhost:3000"

app.use(express.json());

app.post("/auth/signup", createUser);
app.post("/auth/login", loginUser);
app.post("/auth/verify", verifyUser);
app.post("/auth/reset-password-code", generatePasswordResetCode);
app.post("/auth/reset-password", resetPassword);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const expressHandler = serverless(app);

export const handler = applyMiddleware(expressHandler, origin);
