import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const type = JSON.parse(event.body).content;
  switch(type){
    case "class":
      var params = {
        TableName: "class",
      };
      break;
    case "history":
      params = {
        TableName: "history",
        FilterExpression : 'teacherID = :teacherID',
        ExpressionAttributeValues : {':teacherID' : event.requestContext.identity.cognitoIdentityId}
      };
      break;
  }

  try {
    const result = await dynamoDbLib.call("scan", params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
