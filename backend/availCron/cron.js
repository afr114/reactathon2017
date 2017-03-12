'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const _ = require('lodash');
const Promise = require("bluebird");
const request = Promise.promisify(require("request"));
const put = require('request').put

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.AVAILS_DYNAMODB_TABLE,
};

// given a tables response 
function parseTablesResponse(tables) {
  const totalSeats = tables.reduce((acc, curr) => curr.seats + acc, 0)
  const availSeats = tables.filter(t => t.available).reduce((acc, curr) => curr.seats + acc, 0)
  return {
    seats: totalSeats,
    avails: availSeats
  };
}

module.exports.generateAvailsChecks = (event, context, callback) => {
  // fetch all seatAvail from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the seatAvail.'));
      return;
    }

    // get the list of unique omnivoreLocationID's to query from results  
    // NOTE: currently only one ID 
    const omniID = result.Items[0].omnivoreLocationID;
    const rid = result.Items[0].id;

    const options = {
      url: `https://api.omnivore.io/1.0/locations/${omniID}/tables`,
      headers: {
        'Api-Key': 'b7a4045a0d07410bb9bdae3662e96108'
      }
    };

    request(options).then(function(result) {
       // create a response
      const tables = JSON.parse(result.body)._embedded.tables;
      const data = Object.assign({},parseTablesResponse(tables), { omnivoreLocationID: omniID });
      const putURL = `https://dyftmauijc.execute-api.us-east-1.amazonaws.com/dev/seatAvails/${rid}`

      
      put({ url: putURL, method: 'PUT', body: JSON.stringify(data)}, function() {
        const response = {
          putURL,
          seatData: data,
          statusCode: 200,
        };
        callback(null, response);
      })
    });
  });
};