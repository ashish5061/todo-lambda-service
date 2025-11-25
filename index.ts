import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({ region: "us-east-1" });

// Define the expected event shape
interface AddTaskEvent {
  title: string;
  completed: boolean;
}

export const handler = async (event: AddTaskEvent) => {
  const { title, completed } = event;

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
    body: JSON.stringify({
      message: "Task added successfully",
      taskId,
    }),
  };
};
