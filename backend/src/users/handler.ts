import express from "express";
import serverless from "serverless-http";
import { createUser, verifyUser, loginUser, getUserById, uploadProfilePicture } from "./controller";
import { validateToken } from "../middleware/validateToken";
import multer from "multer";

const app = express();

app.use(express.json());
const upload = multer();

app.get("/users/:userId", validateToken, getUserById);
app.post("/users", createUser);
app.post("/users/verify", verifyUser);
app.post("/users/upload-profile-picture", validateToken, upload.single('file'), uploadProfilePicture);
app.post("/login", loginUser);



app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export const handler = serverless(app);
