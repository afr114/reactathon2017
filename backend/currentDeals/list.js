'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const _ = require('lodash');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const dealsParams = {
  TableName: process.env.DEALS_DYNAMODB_TABLE,
};
const availsParams = {
  TableName: process.env.AVAILS_DYNAMODB_TABLE,
};

const daysOfWeek = ["SU", "M","TU","W","TH","F","SA"];


module.exports.list = (event, context, callback) => {
  // fetch all deals from the database
  dynamoDb.scan(dealsParams, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the deals.'));
      return;
    }

    var allDeals = result.Items;
    // then fetch all avails
    dynamoDb.scan(availsParams, (error, result) => {
      const availsByRid = _.keyBy(result.Items, (avail) => avail.id);
      const today = daysOfWeek[new Date().getDay()];
      console.log(allDeals)

      // figure out which deals are elibgile
      // TODO: test filters
      const currentDeals = allDeals
        // check that the deal isn't archived
        //.filter((deal) => !deal.archived)
        // check that today is in the deal
        //.filter((deal) => deal.dealDayOfWeek.indexOf(today) > -1)
        // check that the deal has crossed percentAvail threshold
//        .filter(function(deal){
//          // get percent avails by taking avails/seats - 80 / 100 = 0.2
//          var percentAvail = availsByRid[deal.id].avails/availsByRid[deal.id].seats;
//          return availsByRid[deal.id].dealPercentActivated >= percentAvail;
//        })
        console.log(currentDeals)


       // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify({ currentDeals }),
      };
      callback(null, response);
    });
  });
};
