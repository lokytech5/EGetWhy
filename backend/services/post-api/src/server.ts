import express from "express";
import serverless from "serverless-http";
import { validateToken } from "../../../middleware/validateToken";
import { addComment, createPost, getAllPosts } from "./handler";

const app = express();

app.use(express.json());

app.post("/api/posts", validateToken, createPost);
app.get("/api/feed", getAllPosts);
app.post("/api/posts/:postId/comments", validateToken, addComment);
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export const handler = serverless(app);
