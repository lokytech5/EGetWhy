import middy from "@middy/core";
import httpCors from "@middy/http-cors";

export const applyMiddleware = (handler: any, origin: string) => {
    return middy(handler).use(httpCors({
        origin: origin,
        credentials: true,
        headers: "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent"
    }));
};
