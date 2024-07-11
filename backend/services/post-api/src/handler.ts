import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { docClient } from "../../../lib/dynamoClient"; // Adjust the path according to your project structure
import { v1 as uuidv1 } from 'uuid';
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export const createPost = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Check if event.body is null or undefined
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing request body' }),
    };
  }

  const data = JSON.parse(event.body);
  const timestamp = new Date().toISOString();

  if (!data.userID || !data.content) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' }),
    };
  }

  const params = {
    TableName: process.env.POSTS_TABLE,
    Item: {
      PostID: uuidv1(),
      UserID: data.userID,
      Content: data.content,
      Hashtags: data.hashtags || [],
      CategoryID: data.categoryID || null,
      IsAnonymous: data.isAnonymous || false,
      CreatedAt: timestamp,
      UpdatedAt: timestamp,
    },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `Error creating post: ${error.message}` }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unknown error occurred' }),
    };
  }
};
