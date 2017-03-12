//npm install node-rest-client
//run with node in terminal

var Client = require('node-rest-client').Client;
 
var client = new Client();

var theData;

var url = 'https://platform.otqa.com/availability';
var args = {
    parameters: {
        start_date_time: '2017-03-19T19:00',
        party_size: 2,
        forward_minutes: 60,
        backward_minutes: 60,
        latitude: 37.810175,
        longitude: -122.257167,
        radius: 100,
        include_unavailable: false
    },
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer 27037c67-f394-4cfd-ab51-069ac71132fb'
    }
};

client.get(url, args, function (data, response) {
    console.log(data);
    theData = data
});

var url = 'https://platform.otqa.com/sync/listings/95029';
var args = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer 27037c67-f394-4cfd-ab51-069ac71132fb'
    }
};

client.get(url, args,
    function (data, response) { 
        console.log(data);
    });