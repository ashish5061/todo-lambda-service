import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import crypto from "crypto";

// DynamoDB client
const client = new DynamoDBClient({ region: "us-east-1" });

interface AddTaskEventBody {
  title: string;
  completed: boolean;
}

export const handler = async (event: any) => {
  console.log("Raw event:", event);

  // Parse body (API Gateway sends JSON string)
  const body: AddTaskEventBody = JSON.parse(event.body);

  const { title, completed } = body;

  const taskId = crypto.randomUUID();

  const params = {
    TableName: "TodosTable",
    Item: {
      taskId: { S: taskId },
      title: { S: title },
      completed: { BOOL: completed },
    },
  };

  await client.send(new PutItemCommand(params));

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // VERY important for React
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: JSON.stringify({
      taskId,
      title,
      completed,
    }),
  };
};
