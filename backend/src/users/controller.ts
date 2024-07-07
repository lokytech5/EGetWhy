import { Request, Response } from "express";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../utils/dynamoClient";
import { getSecretHash } from "../utils/cognitoUtils";
import AWS from "aws-sdk";

const USERS_TABLE = process.env.USERS_TABLE;
const cognito = new AWS.CognitoIdentityServiceProvider();

function isAWSError(error: unknown): error is AWS.AWSError {
  return (error as AWS.AWSError).code !== undefined;
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
  
    const cognitoResponse = await cognito.signUp(cognitoParams).promise();

    // Save user details in DynamoDB
    const userId = cognitoResponse.UserSub;
    const createdAt = new Date().toISOString();
    const user = {
      userId,
      username,
      email,
      fullName,
      profilePictureURL: '',
      bio: '',
      location: '',
      createdAt,
      updatedAt: createdAt,
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

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const authParams = {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    UserPoolId: process.env.COGNITO_USER_POOL_ID!,
    ClientId: process.env.COGNITO_CLIENT_ID!,
    AuthParameters: {
      USERNAME: email,
      SECRET_HASH: getSecretHash(email),
      PASSWORD: password,
    },
  };

  try {

    const authResponse = await cognito.adminInitiateAuth(authParams).promise();

    const { AccessToken } = authResponse.AuthenticationResult!;
    res.status(200).json({
      message: 'Login successful',
      accessToken: AccessToken,
    });
  } catch (error) {
    console.error('Error during user login:', error);
    if (isAWSError(error)) {
      if (error.code === 'NotAuthorizedException') {
        res.status(401).json({ error: 'Incorrect username or password' });
      } else if (error.code === 'UserNotFoundException') {
        res.status(404).json({ error: 'User does not exist' });
      } else {
        res.status(500).json({ error: 'Could not log in user' });
      }
    } else {
      res.status(500).json({ error: 'Could not log in user' });
    }
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const { email, code } = req.body;

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
