import { DynamoDBStreamHandler } from "aws-lambda";

export const handler: DynamoDBStreamHandler = async (event) => {
  for (const record of event.Records) {
    console.log("DynamoDB Record: ", record);
    // Process DynamoDB stream event
  }
};
