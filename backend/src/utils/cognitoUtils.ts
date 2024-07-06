import AWS from 'aws-sdk';
import crypto from 'crypto';

const cognito = new AWS.CognitoIdentityServiceProvider();
const COGNITO_APP_CLIENT_ID = process.env.COGNITO_CLIENT_ID!;
const COGNITO_APP_CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET!;

export const getSecretHash = (username: string) => {
  const message = username + COGNITO_APP_CLIENT_ID;
  const hash = crypto.createHmac('sha256', COGNITO_APP_CLIENT_SECRET);
  hash.update(message);
  return hash.digest('base64');
};
