import express from "express";
import serverless from "serverless-http";
import { validateToken } from "../../../middleware/validateToken";
import { applyMiddleware } from "../../../middleware/corsConfig";
import { addComment, createPost, getAllPosts, getBatchLikesAndComments, getCommentsByPostId, getPostByHashtag, getPostById, getPostLikes, getTrendingHashtags, likePost } from "./handler";

const app = express();
const origin = "http://localhost:3000"

app.use(express.json());

app.post("/api/posts", validateToken, createPost);
app.get("/api/feed", getAllPosts);
app.get("/api/hashtags/trending", getTrendingHashtags)
app.get("/api/hashtags/:hashtag/posts", getPostByHashtag);
app.get("/api/posts/:postId", getPostById);
app.post("/api/posts/:postId/comments", validateToken, addComment);
app.get("/api/posts/:postId/comments/list", validateToken, getCommentsByPostId);
app.get("/api/posts/:postId/likes", getPostLikes);
app.post("/api/posts/:postId/like", validateToken, likePost);
app.post("/api/posts/batchLikesAndComments", validateToken, getBatchLikesAndComments);
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const expressHandler = serverless(app);

export const handler = applyMiddleware(expressHandler, origin);
