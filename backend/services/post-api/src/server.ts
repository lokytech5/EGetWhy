import express from "express";
import serverless from "serverless-http";
import { validateToken } from "../../../middleware/validateToken";
import { createPost } from "./handler";

const app = express();

app.use(express.json());

app.get("/api/posts", validateToken, createPost);
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export const handler = serverless(app);
