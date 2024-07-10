import { Request, Response } from "express";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../../lib/dynamoClient";
import { S3 } from "aws-sdk";

const USERS_TABLE = process.env.USERS_TABLE;
const s3 = new S3();
const BUCKET_NAME = process.env.S3_BUCKET_NAME;

if (!BUCKET_NAME) {
    throw new Error('S3_BUCKET_NAME environment variable is not defined');
  }

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const params = {
    TableName: USERS_TABLE,
    Key: { userId },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);

    if (Item) {
      res.json(Item);
    } else {
      console.error(`Could not find user with userId: ${userId}`);
      res.status(404).json({ error: `Could not find user with userId: ${userId}` });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
};

export const uploadProfilePicture = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const file = req.file;
  
    if (!userId || !file) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
  
      console.log('File details:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      });
  
      const extensionMap: { [key: string]: string } = {
        'image/jpeg': 'jpeg',
        'image/png': 'png',
        'image/jpg': 'jpg',
        'image/svg+xml': 'svg',
      };
  
      const extension = extensionMap[file.mimetype];
      if (!extension) {
        return res.status(400).json({ error: 'Unsupported file type' });
      }
  
      const fileName = `${userId}.${extension}`;
      const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
  
      await s3.upload(params).promise();
      const profilePictureURL = `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
  
      // Save the profile picture URL in DynamoDB
      const dynamoParams = {
        TableName: USERS_TABLE,
        Key: { userId },
        UpdateExpression: "set profilePictureURL = :url",
        ExpressionAttributeValues: {
          ":url": profilePictureURL,
        },
      };
  
      const command = new UpdateCommand(dynamoParams);
      await docClient.send(command);
  
      res.status(200).json({ profilePictureURL });
  
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      res.status(500).json({ error: 'Could not upload profile picture' });
    }
  }
