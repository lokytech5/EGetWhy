import { S3Handler } from "aws-lambda";

export const handler: S3Handler = async (event) => {
  for (const record of event.Records) {
    console.log("S3 Record: ", record);
    // Process S3 event
  }
};
