import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

// Configure the JWKS client
const client = jwksClient({
  jwksUri: `https://cognito-idp.us-east-1.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`
});

// Function to retrieve the signing key
function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err || !key) {
      callback(err, undefined);
    } else {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    }
  });
}

// Middleware to validate the JWT
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access token missing" });
  }

  jwt.verify(token, getKey, {
    algorithms: ["RS256"],
    audience: process.env.COGNITO_CLIENT_ID,
    issuer: `https://cognito-idp.us-east-1.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
    complete: true,
  }, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ error: "Invalid token" });
    }

    const payload = (decoded as jwt.Jwt & { payload: JwtPayload }).payload;

    // Log the actual audience value in the token
    console.log('Token audience:', payload.aud);
    console.log('Expected audience:', process.env.COGNITO_CLIENT_ID);

    if (payload.aud !== process.env.COGNITO_CLIENT_ID) {
      return res.status(401).json({ error: "Invalid token audience" });
    }

    console.log('Decoded token:', payload);

    // Token is valid, attach decoded token to request
    req.user = payload;
    next();
  });
};
