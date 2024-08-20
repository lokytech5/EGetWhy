import { Request, Response } from "express";
import { GetCommand, PutCommand, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../../lib/dynamoClient";
import { S3 } from "aws-sdk";
import { buildResponse } from "../../../lib/responseUtils";

const USERS_TABLE = process.env.USERS_TABLE;
const USER_INTERESTS_TABLE = process.env.USER_INTERESTS_TABLE;
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
      res.json(buildResponse(Item));
    } else {
      console.error(`Could not find user with userId: ${userId}`);
      res.status(404).json(buildResponse({ error: `Could not find user with userId: ${userId}` }));
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.user;

  const params = {
    TableName: USERS_TABLE,
    Key: { userId },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);

    if (Item) {
      res.json(buildResponse(Item));
    } else {
      console.error(`Could not find user with userId: ${userId}`);
      res.status(404).json(buildResponse({ error: `Could not find user with userId: ${userId}` }));
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
        return res.status(400).json(buildResponse({ error: 'Unsupported file type' }));
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
  
      res.status(200).json(buildResponse({ profilePictureURL }));
  
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      res.status(500).json({ error: 'Could not upload profile picture' });
    }
  }

  export const updateUser = async (req: Request, res: Response) => {
    const userId = req.user as string;
  
    const { username, fullName, location, bio } = req.body;
  
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }
  
    const updateExpressions = [];
    const expressionAttributeNames: { [key: string]: string } = {};
    const expressionAttributeValues: { [key: string]: any } = {};
  
    if (username) {
      updateExpressions.push('#username = :username');
      expressionAttributeNames['#username'] = 'username';
      expressionAttributeValues[':username'] = username;
    }
  
    if (fullName) {
      updateExpressions.push('#fullName = :fullName');
      expressionAttributeNames['#fullName'] = 'fullName';
      expressionAttributeValues[':fullName'] = fullName;
    }
  
    if (location) {
      updateExpressions.push('#location = :location');
      expressionAttributeNames['#location'] = 'location';
      expressionAttributeValues[':location'] = location;
    }
  
    if (bio) {
      updateExpressions.push('#bio = :bio');
      expressionAttributeNames['#bio'] = 'bio';
      expressionAttributeValues[':bio'] = bio;
    }
  
    if (updateExpressions.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
  
    const updateExpression = `SET ${updateExpressions.join(', ')}`;
  
    const params: UpdateCommandInput = {
      TableName: USERS_TABLE,
      Key: { userId },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW" // Return the updated item
    };
  
    try {
      const command = new UpdateCommand(params);
      const { Attributes } = await docClient.send(command);
  
      res.status(200).json(buildResponse(Attributes));
    } catch (error) {
      console.error("Error updating user: ", error);
      res.status(500).json({ error: 'Could not update user' });
    }
  };

  export const updateUserInterests = async (req: Request, res: Response) => {
    const { userId, interests } = req.body; // interests should be an array of hashtags

  if (!userId || !interests || !Array.isArray(interests)) {
    return res.status(400).json({ error: 'Missing required fields or interests is not an array' });
  }

  const params = {
    TableName: USER_INTERESTS_TABLE,
    Item: {
      UserID: userId,
      Interests: interests,
    },
  };

  try {
    const command = new PutCommand(params); 
    await docClient.send(command);
    res.status(200).json(buildResponse(params.Item));
  } catch (error) {
    console.error('Error updating user interests:', error);
    res.status(500).json(buildResponse(null, { error: 'Could not update user interests' }));
  }
  }

  export const getUserInterests = async (req: Request, res: Response) => {
    const { userId } = req.params;
  
    const params = { 
      TableName: USER_INTERESTS_TABLE,
      Key: { UserID: userId },
    };
  
    try {
      const command = new GetCommand(params);
      const data = await docClient.send(command);
      if (data.Item) {
        res.status(200).json(buildResponse(data.Item));
      } else {
        res.status(404).json(buildResponse(null, { error: 'User interests not found' }));
      }
    } catch (error) {
      console.error('Error fetching user interests:', error);
      res.status(500).json(buildResponse(null, { error: 'Could not retrieve user interests' }));
    }
  };

export const clearUserInterests = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if(!userId) {
    res.status(400).json(buildResponse({ error: 'Missing required fields'}))
  }

  const params = {
    TableName: USER_INTERESTS_TABLE,
    Item: {
      UserID: userId,
      Interests: [],
    },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.status(200).json(buildResponse({ message: 'User interests cleared successfully'}))
  } catch (error) {
    console.error('Error clearing user interests:', error);
    res.status(500).json(buildResponse(null, { error: 'Could not clear user interests' }));
  }
}
