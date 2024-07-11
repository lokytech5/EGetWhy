import { JwtPayload } from "aws-jwt-verify/jwt-model";

declare module "express-serve-static-core" {
  export interface Request {
    user?: string | JwtPayload;
  }
}
