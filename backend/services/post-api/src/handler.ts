import {Request, Response} from "express";
import { docClient } from "../../../lib/dynamoClient"; // Adjust the path according to your project structure
import { v1 as uuidv1 } from 'uuid';
import { PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { buildResponse } from "../../../lib/responseUtils";

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
    res.status(201).json(buildResponse(params.Item));
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(buildResponse(null, { error: `Error creating post: ${error.message}` }));
    } else {
      res.status(500).json(buildResponse(null, { error: 'Unknown error occurred' }));
    }
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  const params = {
    TableName: process.env.POSTS_TABLE!,
  };

  try {
    const command = new ScanCommand(params);
    const data = await docClient.send(command);
    res.status(200).json(buildResponse(data.Items));
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(buildResponse(null, { error: `Error getting posts: ${error.message}` }));
    } else {
      res.status(500).json(buildResponse(null, { error: 'Unknown error occurred' }));
    }
  }
};

export const addComment = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { userId, content } = req.body;
  const  timestamp = new Date().toISOString();

  if (!userId || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const params = {
    TableName: process.env.COMMENTS_TABLE!,
    Item: {
      CommentID: uuidv1(),
      PostID: postId,
      UserID: userId,
      Content: content,
      CreatedAt: timestamp,
      UpdatedAt: timestamp,
    },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.status(201).json(buildResponse(params.Item));
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(buildResponse(null, { error: `Error adding comment: ${error.message}` }));
    } else {
      res.status(500).json(buildResponse(null, { error: 'Unknown error occurred' }));
    }
  }
};