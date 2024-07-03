"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = (0, express_1.default)();
const USERS_TABLE = process.env.USERS_TABLE;
if (!USERS_TABLE) {
    throw new Error("USERS_TABLE environment variable is not set");
}
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
app.use(express_1.default.json());
app.get("/users/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: USERS_TABLE,
        Key: {
            userId: req.params.userId,
        },
    };
    try {
        const command = new lib_dynamodb_1.GetCommand(params);
        const { Item } = yield docClient.send(command);
        if (Item) {
            const { userId, name } = Item;
            res.json({ userId, name });
        }
        else {
            res
                .status(404)
                .json({ error: 'Could not find user with provided "userId"' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not retrieve user" });
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, name } = req.body;
    if (typeof userId !== "string") {
        res.status(400).json({ error: '"userId" must be a string' });
    }
    else if (typeof name !== "string") {
        res.status(400).json({ error: '"name" must be a string' });
    }
    const params = {
        TableName: USERS_TABLE,
        Item: { userId, name },
    };
    try {
        const command = new lib_dynamodb_1.PutCommand(params);
        yield docClient.send(command);
        res.json({ userId, name });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not create user" });
    }
}));
app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});
exports.handler = (0, serverless_http_1.default)(app);
