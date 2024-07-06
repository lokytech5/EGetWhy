import { Request, Response } from "express";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../utils/dynamoClient";
import { User } from "./model";
import { getSecretHash } from "../utils/cognitoUtils";
import AWS from "aws-sdk";

const USERS_TABLE = process.env.USERS_TABLE;
const cognito = new AWS.CognitoIdentityServiceProvider();

function isAWSError(error: unknown): error is AWS.AWSError {
  return (error as AWS.AWSError).code !== undefined;
}

export const getUserbyId = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId
    },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    if (Item) {
      res.json(Item);
    } else {
      res.status(404).json({ error: `Could not find user with userId: ${userId}` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
};


export const createUser = async (req: Request, res: Response) => {
  const { username, email, password, fullName } = req.body;

  if (!username || !email || !password || !fullName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const cognitoParams = {
    ClientId: process.env.COGNITO_CLIENT_ID!,
    SecretHash: getSecretHash(email),
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'name', Value: fullName },
    ],
  };

  try {
    console.log('Attempting to sign up user in Cognito with params:', cognitoParams);

    // Create user in Cognito
    const cognitoResponse = await cognito.signUp(cognitoParams).promise();
    console.log('Cognito sign-up response:', cognitoResponse);

   // Save user details in DynamoDB
   const userId = cognitoResponse.UserSub;
   const createdAt = new Date().toISOString();
   const updatedAt = createdAt;
   const user = {
    userId,
    username,
    email,
    fullName,
    profilePictureURL: '',
    bio: '',
    location: '',
    createdAt,
    updatedAt
  };
  const dynamoParams = {
    TableName: USERS_TABLE,
    Item: user,
  };

   const putCommand = new PutCommand(dynamoParams);
   await docClient.send(putCommand);

   res.status(201).json({ message: 'User created successfully', user });
 } catch (error) {
  console.error('Error during user registration:', error);
  
  if (isAWSError(error) && error.code === 'UsernameExistsException') {
    res.status(400).json({ error: 'User already exists' });
  } else {
    res.status(500).json({ error: 'Could not create user' });
  }
}
};


export const verifyUser = async(req: Request, res: Response) => {
  const {email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const cognitoParams = {
    ClientId: process.env.COGNITO_CLIENT_ID!,
    SecretHash: getSecretHash(email),
    Username: email,
    ConfirmationCode: code,
  };

  try {
    
    const cognitoResponse = await cognito.confirmSignUp(cognitoParams).promise();
    console.log('Cognito verify response:', cognitoResponse);

    if (cognitoResponse) {
      res.status(200).json({ message: 'User verified successfully' });
    } else {
      res.status(500).json({ error: 'User verification failed' });
    }
  } catch (error) {
    console.error('Error during user verification:', error);
    res.status(500).json({ error: 'Could not verify user' });
  }
};
