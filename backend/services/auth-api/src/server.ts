import express from "express";
import serverless from "serverless-http";
import { createUser, loginUser, verifyUser } from "./handler";

const app = express();

app.use(express.json());

app.post("/auth/signup", createUser);
app.post("/auth/login", loginUser);
app.post("/auth/verify", verifyUser);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export const handler = serverless(app);
