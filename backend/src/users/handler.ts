import express from "express";
import serverless from "serverless-http";
import { getUserbyId, createUser } from "./controller";

const app = express();

app.use(express.json());

app.get("/users/:userId", getUserbyId);
app.post("/users", createUser);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export const handler = serverless(app);
