import { S3Handler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE;

if (!USERS_TABLE) {
  throw new Error('USERS_TABLE environment variable is not defined');
}

export const handler: S3Handler = async (event) => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;
    const url = `https://${bucket}.s3.amazonaws.com/${key}`;
    
    // Extract userId from the key
    const userId = key.split('/')[0];
    
    const params = {
      TableName: USERS_TABLE,
      Key: { userId },
      UpdateExpression: "set profilePictureURL = :url",
      ExpressionAttributeValues: {
        ":url": url,
      },
    };

    try {
      await dynamoDb.update(params).promise();
      console.log(`Profile picture URL updated for userId ${userId}`);
    } catch (error) {
      console.error(`Error updating profile picture URL for userId ${userId}:`, error);
    }
  }
};
