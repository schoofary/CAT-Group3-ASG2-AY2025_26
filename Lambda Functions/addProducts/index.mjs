import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({});

const docClient = DynamoDBDocumentClient.from(client);


export const addproducts = async (event) => {

  console.log("Event received:", JSON.stringify(event)); // This helps you debug in CloudWatch

  let body;

  try {

    // Handle both Proxy Integration (string) and direct testing (object)

    body = typeof event.body === 'string' ? JSON.parse(event.body) : event;

  } catch (e) {

    return {

      statusCode: 400,

      body: JSON.stringify({ message: "Invalid JSON format" })

    };

  }

  const params = {

    TableName: process.env.TABLE_NAME,

    Item: {

      // Ensure ID is treated as a Number by DynamoDB
      "ID": Number(body.ID),
      "Name": body.Name,
      "Category": body.Category,
      "Price": Number(body.Price), // DynamoDB also expects Price as Number
      "Stock": Number(body.Stock)  // DynamoDB also expects Stock as Number

    }

  };

  
  try {

    await docClient.send(new PutCommand(params));

    return {

      statusCode: 200,

      headers: {

        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"

      },

      body: JSON.stringify({ message: "Product added!", productId: body.ID })

    };

  } catch (err) {

    console.error("DynamoDB Error:", err);

    return {

      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message })

    };

  }

};