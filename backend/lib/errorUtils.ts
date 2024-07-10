import AWS from 'aws-sdk';


export function isAWSError(error: unknown): error is AWS.AWSError {
  return (
    error instanceof Error &&
    'code' in error &&
    'message' in error &&
    'name' in error
  );
}

export class InvalidFileTypeError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "InvalidFileTypeError";
    }
  }
  
  export function isInvalidFileTypeError(error: unknown): error is InvalidFileTypeError {
    return error instanceof InvalidFileTypeError;
  }
