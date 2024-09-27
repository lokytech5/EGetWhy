import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../../lib/dynamoClient";

const USERS_TABLE = process.env.USERS_TABLE_NAME;

/**
 * Fetch user details from the DynamoDB table by userId.
 * @param {string} userId - The user ID to search for.
 * @returns {Promise<string>} - A promise that resloves with the user details.
 */

export const getUserDetails = async (userId: string): Promise<any> => {

    const userParams = {
        TableName: USERS_TABLE!,
        Key: { userId },
    };

    try {
        const userCommand = new GetCommand(userParams);
        const userData = await docClient.send(userCommand);

        if(!userData.Item) {
            throw new Error("User not found");
        }

        return userData.Item;
    } catch (error) {
        console.error("Error fetching user deatils: ", error);
        throw error;
    }
};