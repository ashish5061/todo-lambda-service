import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event: any) => {
  console.log("Request event:", event);

  const params = {
    TableName: "TodosTable",
  };

  const result = await client.send(new ScanCommand(params));

  // Convert DynamoDB AttributeValues → plain JSON
  const tasks = (result.Items ?? []).map((item) => ({
    taskId: item.taskId.S,
    title: item.title.S,
    completed: item.completed.BOOL,
  }));

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: JSON.stringify(tasks),
  };
};
