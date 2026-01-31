import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const getproducts = async (event) => {

 const params = {

  TableName: process.env.TABLE_NAME,

 };
  
 try {

  const data = await docClient.send(new ScanCommand(params));

  return {

   statusCode: 200,

   headers: {

     "Access-Control-Allow-Origin": "*", // Required for browsers to accept the data
     "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
     "Content-Type": "application/json"

   },

   body: JSON.stringify(data.Items)

 };

 } catch (err) {
  console.error(err);
  throw err;
 }

};