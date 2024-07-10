import { Request, Response, NextFunction } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';


const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  tokenUse: 'access', 
  clientId: process.env.COGNITO_CLIENT_ID!,
});


export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.error("Access token missing");
    return res.status(401).json({ error: "Access token missing" });
  }

  try {
    const payload = await verifier.verify(token);

    req.user = payload.sub;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ error: "Invalid token" });
  }
};
