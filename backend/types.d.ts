import { JwtPayload } from "aws-jwt-verify/jwt-model";

declare module "express" {
  export interface Request {
    user?: string | JwtPayload;
  }
}
