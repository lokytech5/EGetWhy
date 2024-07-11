import {Request, Response} from "express";
import { docClient } from "../../../lib/dynamoClient"; // Adjust the path according to your project structure
import { v1 as uuidv1 } from 'uuid';
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export const createPost = async (req: Request, res: Response) => {
  const { userID, content, hashtags, categoryID, isAnonymous } = req.body;
  const timestamp = new Date().toISOString();

  if (!userID || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const params = {
    TableName: process.env.POSTS_TABLE!,
    Item: {
      PostID: uuidv1(),
      UserID: userID,
      Content: content,
      Hashtags: hashtags || [],
      CategoryID: categoryID || null,
      IsAnonymous: isAnonymous || false,
      CreatedAt: timestamp,
      UpdatedAt: timestamp,
    },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.status(201).json(params.Item);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Error creating post: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};
