import express from "express";
import serverless from "serverless-http";
import { validateToken } from "../../../middleware/validateToken";
import { addComment, createPost, getAllPosts, getPostByHashtag, getPostById, getTrendingHashtags, likePost } from "./handler";

const app = express();

app.use(express.json());

app.post("/api/posts", validateToken, createPost);
app.get("/api/feed", getAllPosts);
app.get("/api/hashtags/trending", getTrendingHashtags)
app.get("/api/hashtags/:hashtag/posts", getPostByHashtag);
app.get("/api/posts/:postId", getPostById);
app.post("/api/posts/:postId/comments", validateToken, addComment);
app.post("/api/posts/:postId/like", validateToken, likePost);
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export const handler = serverless(app);
