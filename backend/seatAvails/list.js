'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.AVAILS_DYNAMODB_TABLE,
};

module.exports.list = (event, context, callback) => {
  // fetch all seatAvail from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the seatAvail.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
         // Required for CORS support to work
        "Access-Control-Allow-Origin" : "*",
        // Required for cookies, authorization headers with HTTPS
        "Access-Control-Allow-Credentials" : true
      },
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
