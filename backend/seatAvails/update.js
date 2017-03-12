'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  //if (typeof data.text !== 'string' || typeof data.seatAvailArchived !== 'boolean') {
  //  console.error('Validation Failed');
  //  callback(new Error('Couldn\'t update the seatAvail item.'));
  //  return;
  //}

  const params = {
    TableName: process.env.AVAILS_DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      '#avails': 'avails',
      '#seats': 'seats', 
      '#omnivoreLocationID': 'omnivoreLocationID',
    },
    ExpressionAttributeValues: {
      ':avails': data.avails,
      ':seats': data.seats, 
      ':updatedAt': timestamp, 
      ':omnivoreLocationID': data.omnivoreLocationID,
    },
    UpdateExpression: 'SET #seats = :seats, #avails = :avails, updatedAt = :updatedAt, #omnivoreLocationID = :omnivoreLocationID',
    ReturnValues: 'ALL_NEW',
  };

  console.log(params)

  // update the seatAvail in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t update the seatAvail item.'));
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
