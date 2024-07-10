import express from "express";
import serverless from "serverless-http";
import { getUserById, uploadProfilePicture } from "./handler";
import { validateToken } from "../../../middleware/validateToken";
import fileUpload  from "../../../middleware/fileUploads";

const app = express();

app.use(express.json());

app.get("/users/:userId", validateToken, getUserById);
app.post("/users/upload-profile-picture", validateToken, fileUpload.single('file'), uploadProfilePicture);
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export const handler = serverless(app);
