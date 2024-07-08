import { Request, Response } from "express";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../utils/dynamoClient";
import { getSecretHash } from "../utils/cognitoUtils";
import AWS from "aws-sdk";
import { S3 } from 'aws-sdk';
import { isAWSError } from "../utils/awsErrorUtils";

const USERS_TABLE = process.env.USERS_TABLE;
const cognito = new AWS.CognitoIdentityServiceProvider();
const lambda = new AWS.Lambda();

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
      // Use email to get userId from Cognito
      const userResponse = await cognito.adminGetUser({
        UserPoolId: process.env.COGNITO_USER_POOL_ID!,
        Username: email,
      }).promise();

      const userAttributes = userResponse.UserAttributes;
      if (!userAttributes) {
        throw new Error('UserAttributes not found in Cognito response');
      }

      const userId = userAttributes.find(attr => attr.Name === 'sub')?.Value;

      if (!userId) {
        throw new Error('UserId not found in Cognito response');
      }

      const params = {
        TableName: USERS_TABLE,
        Key: { userId },
      };
      const command = new GetCommand(params);
      const { Item } = await docClient.send(command);

    // Using SendGird to sendWelcomeEmail Lambda function within the lambda function
      if (Item) {
        const lambdaParams = {
          FunctionName: `sendWelcomeEmail-${process.env.STAGE}`,
          InvocationType: "Event",
          Payload: JSON.stringify({
            email: Item.email,
            fullName: Item.fullName,
          }),
        };

        // Invoke the Lambda function without awaiting the result
        lambda.invoke(lambdaParams).promise().catch(error => {
          console.error('Error invoking sendWelcomeEmail Lambda:', error);
        });
      }

      res.status(200).json({ message: 'User verified successfully' });
    } else {
      res.status(500).json({ error: 'User verification failed' });
    }
  } catch (error) {
    console.error('Error during user verification:', error);
    res.status(500).json({ error: 'Could not verify user' });
  }
};


export const uploadProfilePicture = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const file = req.file;

  if (!userId || !file) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {

    const fileName = `${userId}.jpeg`;
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

