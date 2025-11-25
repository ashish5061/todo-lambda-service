import { handler } from "./index";

const event = {
  title: "Test Task",
  completed: false,
};

async function testLambda() {
  const result = await handler(event);
  console.log(result);
}

testLambda();
