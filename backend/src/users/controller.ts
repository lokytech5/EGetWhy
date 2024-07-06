import { Request, Response } from "express";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../utils/dynamoClient";
import { User } from "./model";
import { getSecretHash } from "../utils/cognitoUtils";
import AWS from "aws-sdk";

const USERS_TABLE = process.env.USERS_TABLE;
const cognito = new AWS.CognitoIdentityServiceProvider();

export const getUserbyId = async (req: Request, res: Response) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    if (Item) {
      const { userId, 
              username, 
              email, 
              fullName, 
              profilePictureURL, 
              bio, 
              location, 
              createdAt, 
              updatedAt } = Item as User;

    res.json({ userId, username, email, fullName, profilePictureURL, bio, location, createdAt, updatedAt });
    } 
    else {
      res.status(404).json({ error: 'Could not find user with "userId"' });
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

    res.status(201).json(cognitoResponse);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Could not create user' });
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
    // Verify user in Cognito
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
