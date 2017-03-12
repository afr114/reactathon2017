const request = require('superagent');
const moment = require('moment');
const fetch = require('graphql-fetch')('https://www.opentable.com/graphql')
const _ = require('lodash');
const OPENTABLE_BEARER = 'f2f00c39-097c-4c6f-9c4c-ff0a9c32a1c9';

const res = {
    "availabilities": [
    {
        "rid": 2,
        "party_size": 2,
        "times_available": [
        {
          "time": "2016-06-29T17:45",
          "booking_url": "https://www.opentable.com/book/validate?rid=2&d=2016-06-29T17%3A45&sd=2016-06-29T17%3A45&p=2&pt=100&hash=1394880486&ref=",
          "credit_card_required": false
        },
        {
          "time": "2016-06-29T18:00",
          "booking_url": "https://www.opentable.com/book/validate?rid=2&d=2016-06-29T18%3A00&sd=2016-06-29T18%3A00&p=2&pt=100&hash=691648466&ref=",
          "credit_card_required": true
        }
        ],
        "href": "https://platform.opentable.com/sync/listings/2"
    },
    {
        "rid": 3,
        "party_size": 2,
        "times_available": [
        {
          "time": "2016-06-29T17:45",
          "booking_url": "https://www.opentable.com/book/validate?rid=3&d=2016-06-29T17%3A45&sd=2016-06-29T17%3A45&p=2&pt=100&hash=1396480486&ref=",
          "credit_card_required": false
        },
        {
          "time": "2016-06-29T18:00",
          "booking_url": "https://www.opentable.com/book/validate?rid=3&d=2016-06-29T18%3A00&sd=2016-06-29T18%3A00&p=2&pt=100&hash=694568466&ref=",
          "credit_card_required": true
        }
        ],
        "href": "https://platform.opentable.com/sync/listings/3"
    },
    {
        "rid": 4,
        "party_size": 2,
        "times_available": null,
        "no_availability_reasons" : [ "NoTimesExist" ],
        "href": "https://platform.opentable.com/sync/listings/3"
    }
    ]
}

const temp = {
  "data": {
    "restaurant": {
      "restaurantId": 1934,
      "description": "Michael Jordan's Steak House specializes in Prime aged steaks.  The Steak House is known for its classic contemporary steakhouse cuisine, award winning wine selection, personalized service, and architectural excellence. \"World class steaks in a world class setting.\"  We are a 21+ unless accompanied by a Parent or Legal Guardian.",
      "urls": {
        "profileUrl": "/michael-jordans-steak-house-mohegan-sun"
      },
      "name": "Michael Jordan's Steak House - Mohegan Sun",
      "reviews": [
        {
          "rating": {
            "overall": 3
          }
        },
        {
          "rating": {
            "overall": 5
          }
        },
        {
          "rating": {
            "overall": 5
          }
        },
        {
          "rating": {
            "overall": 5
          }
        },
        {
          "rating": {
            "overall": 2
          }
        },
      ],
    }
  }
};

function getRestaurantInfo(id) {
  const query = `
    query {
      restaurant(restaurantId: $id) {
        restaurantId,
        description,
        urls {
          profileUrl
        },
        name,
        reviews(limit: 100, offset: 0) {
          rating {
            overall
          }
        }
      }
    }
  `;
  const queryVars = {
    id: id
  }

  return fetch(query, queryVars, {})
    .then(results => {
      if (results.error) {
        return [];
      }
      const restaurant = results.data.restaurant;
      if (restaurant.reviews.length > 0) {
        restaurant.rating = restaurant.reviews.reduce((acc, val) => acc + val.rating.overall, 0) / restaurant.reviews.length;
      }
      return restaurant;
    }).catch (err => {
      const restaurant = temp.data.restaurant;
      if (restaurant.reviews.length > 0) {
        restaurant.rating = restaurant.reviews.reduce((acc, val) => acc + val.rating.overall, 0) / restaurant.reviews.length;
      }
      return restaurant;
    })
}

export function getRestaurants(geoLocation) {
  // @TODO temporary
  const restaurant = temp.data.restaurant;
  if (restaurant.reviews.length > 0) {
    restaurant.rating = restaurant.reviews.reduce((acc, val) => acc + val.rating.overall, 0) / restaurant.reviews.length;
  }
  return Promise.resolve([ restaurant, restaurant ]);

  // Date needs to be rounded to the nearest 15 minutes
  const start = moment();
  const remainder = 30 - start.minute() % 30;
  const startTime = moment(start).add("minutes", remainder).format('YYYY-MM-DDTHH:mm');

  return request.get('https://platform.opentable.com/availability')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${OPENTABLE_BEARER}`)
    // .set('Access-Control-Allow-Origin', '*')
    .query({
      latitude: geoLocation.lat,
      longitude: geoLocation.lng,
      start_date_time: startTime,
      party_size: 2,
      radius: 1,
      forward_minutes: 90,
      backward_minutes: 30,
    })
    .end(function(err, restemp){
      if (res.availabilities) {
        const availabilities = res.availabilities.filter(a => a.times_available && a.times_available.length > 0)
        const ids = _.uniqBy(availabilities, 'rid');
        return Promise.all(ids.map(id => getRestaurantInfo(id)))
          .then(restaurants => restaurants)
          .catch(err => {
            console.log('err fetching restaurants')
          });
      }
    });
};
