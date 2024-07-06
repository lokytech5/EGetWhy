import express from "express";
import serverless from "serverless-http";
import { getUserbyId, createUser, verifyUser } from "./controller";

const app = express();

app.use(express.json());

app.get("/users/:userId", getUserbyId);
app.post("/users", createUser);
app.post("/users/verify", verifyUser);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export const handler = serverless(app);
