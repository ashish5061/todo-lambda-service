import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });

export const handler = async () => {
  const params = {
    TableName: "TodosTable"
  };

  const result = await client.send(new ScanCommand(params));

  // Convert DynamoDB format → normal JSON
  const tasks = (result.Items ?? []).map((item) => ({
    taskId: item.taskId.S,
    title: item.title.S,
    completed: item.completed.BOOL,
  }));

  return tasks;
};
