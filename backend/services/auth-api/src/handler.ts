import { getSecretHash } from "../../../lib/cognitoUtils";
import { docClient } from "../../../lib/dynamoClient";
import { isAWSError } from "../../../lib/errorUtils";
import { PutCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import AWS, { S3 } from "aws-sdk";
import { Request, Response } from "express";
import { buildResponse } from "../../../lib/responseUtils";
import notifyPasswordReset from "./notifyPasswordReset";



const USERS_TABLE = process.env.USERS_TABLE;
const cognito = new AWS.CognitoIdentityServiceProvider();
const lambda = new AWS.Lambda();

const s3 = new S3();
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
if (!BUCKET_NAME) {
  throw new Error('S3_BUCKET_NAME environment variable is not defined');
}

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
      const timestamp = new Date().toISOString();
      const user = {
        userId,
        username,
        email,
        fullName,
        profilePictureURL: '',
        bio: '',
        location: '',
        createdAt: timestamp,
        updatedAt: timestamp,
      };
  
      const dynamoParams = {
        TableName: USERS_TABLE,
        Item: user,
      };
  
      const putCommand = new PutCommand(dynamoParams);
      await docClient.send(putCommand);
  
      res.status(201).json(buildResponse({ message: 'User created successfully', user }));
    } catch (error) {
      if(error instanceof Error){
        res.status(500).json(buildResponse({error:  `User already exits: ${error.message}` }))
      } else {
        res.status(500).json(buildResponse({ error: 'Unknown error occurred' }));
      }
    }
  };
  
  
  export const loginUser = async (req: Request, res: Response) => {
    // This is a minor change to force a new Lambda version
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
      res.status(200).json(buildResponse({ message: 'Login successful', accessToken: AccessToken }));
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
  
        res.status(200).json(buildResponse({ message: 'User verified successfully' }));
      } else {
        res.status(500).json(buildResponse({ error: 'User verification failed' }));
      }
    } catch (error) {
      console.error('Error during user verification:', error);
      res.status(500).json(buildResponse({ error: 'Could not verify user' }));
    }
  };


export const generatePasswordResetCode = async (req: Request, res: Response) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json(buildResponse({ error: 'Missing required fields' }));
    }
  
    const cognitoParams = {
      ClientId: process.env.COGNITO_CLIENT_ID!,
      SecretHash: getSecretHash(email),
      Username: email,
    };
  
    try {
      await cognito.forgotPassword(cognitoParams).promise();
  
      const dynamoParams = {
        TableName: process.env.RESET_CODES_TABLE!,
        Item: {
          email, // primary key
          createdAt: new Date().toISOString(),
        },
      };
  
      const putCommand = new PutCommand(dynamoParams);
      await docClient.send(putCommand);
  
      res.status(200).json(buildResponse({ message: 'Password reset code sent to email' }));
    } catch (error) {
      console.error('Error generating password reset code:', error);
      res.status(500).json(buildResponse({ error: 'Could not generate password reset code' }));
    }
  };


  export const resetPassword = async (req: Request, res: Response) => {
    const { email, code, newPassword } = req.body;
  
    if (!email || !code || !newPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const queryParams = {
      TableName: process.env.RESET_CODES_TABLE!,
      Key: { email: email },
    };
  
    try {
      const getCommand = new GetCommand(queryParams);
      const { Item } = await docClient.send(getCommand);
  
      if (!Item) {
        return res.status(404).json({ error: 'Invalid or expired reset request' });
      }
  
      const cognitoParams = {
        ClientId: process.env.COGNITO_CLIENT_ID!,
        SecretHash: getSecretHash(email),
        Username: email,
        ConfirmationCode: code,
        Password: newPassword,
      };
  
      await cognito.confirmForgotPassword(cognitoParams).promise();

      await notifyPasswordReset(email);

    res.status(200).json(buildResponse({ message: 'Password reset successfully' }));
  } catch (error) {
    console.error('Error during password reset:', error);

    if (error instanceof Error) {
      if (error.name === 'CodeMismatchException') {
        res.status(400).json({ error: 'Invalid or expired code' });
      } else if (error.name === 'UserNotFoundException') {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(500).json({ error: `Could not reset password: ${error.message}` });
      }
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};