'use strict';
console.log('loaded')
const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DEALS_DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      dealTitle: data.title,
      dealText: data.text,
      dealPercentActivated: data.percentActivated,
      dealPercentDiscount: data.percentDiscount,
      dealDayOfWeek: data.dayOfWeek,
      dealRestaurantID: data.rid,
      dealArchived: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the deal to the database
  dynamoDb.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the deal item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
