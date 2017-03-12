'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  console.log(data)


  const params = {
    TableName: process.env.DEALS_DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      '#dealText': 'text'

    },
    ExpressionAttributeValues: {
      ':dealText': data.text,
      ':dealArchived': data.dealArchived,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #dealText = :dealText, dealArchived = :dealArchived, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the deal in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t update the deal item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
