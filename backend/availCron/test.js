
var tables = [
  {
    "available": true,
    "id": "1",
    "name": "1",
    "number": 1,
    "pos_id": "1",
    "seats": 2,
    "_links": {
      "open_tickets": {
        "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/tickets/?where=and(eq(open,true),eq(@table.id,'1'))" ,
        "type": "application/hal+json; name=ticket_list"
      },
      "revenue_center": {
        "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/revenue_centers/1/" ,
        "type": "application/hal+json; name=revenue_center"
      },
      "self": {
        "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/tables/1/" ,
        "type": "application/hal+json; name=table"
      }
    },
    "_embedded": {
      "revenue_center": {
        "default": true,
        "id": "1",
        "name": "Test",
        "pos_id": "1",
        "_links": {
          "open_tickets": {
            "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/tickets/?where=and(eq(open,true),eq(@revenue_center.id,'1'))" ,
            "type": "application/hal+json; name=ticket_list"
          },
          "self": {
            "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/revenue_centers/1/" ,
            "type": "application/hal+json; name=revenue_center"
          },
          "tables": {
            "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/tables/?where=eq(@revenue_center.id,'1')" ,
            "type": "application/hal+json; name=table_list"
          }
        }
      }
    }
  },
  {
    "available": false,
    "id": "2",
    "name": "2",
    "number": 2,
    "pos_id": "2",
    "seats": 4,
    "_links": {
      "open_tickets": {
        "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/tickets/?where=and(eq(open,true),eq(@table.id,'2'))" ,
        "type": "application/hal+json; name=ticket_list"
      },
      "revenue_center": {
        "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/revenue_centers/1/" ,
        "type": "application/hal+json; name=revenue_center"
      },
      "self": {
        "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/tables/2/" ,
        "type": "application/hal+json; name=table"
      }
    },
    "_embedded": {
      "revenue_center": {
        "default": true,
        "id": "1",
        "name": "Test",
        "pos_id": "1",
        "_links": {
          "open_tickets": {
            "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/tickets/?where=and(eq(open,true),eq(@revenue_center.id,'1'))" ,
            "type": "application/hal+json; name=ticket_list"
          },
          "self": {
            "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/revenue_centers/1/" ,
            "type": "application/hal+json; name=revenue_center"
          },
          "tables": {
            "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/tables/?where=eq(@revenue_center.id,'1')" ,
            "type": "application/hal+json; name=table_list"
          }
        }
      }
    }
  },
  {
    "available": true,
    "id": "3",
    "name": "3",
    "number": 3,
    "pos_id": "3",
    "seats": null,
    "_links": {
      "open_tickets": {
        "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/tickets/?where=and(eq(open,true),eq(@table.id,'3'))" ,
        "type": "application/hal+json; name=ticket_list"
      },
      "revenue_center": {
        "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/revenue_centers/1/" ,
        "type": "application/hal+json; name=revenue_center"
      },
      "self": {
        "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/tables/3/" ,
        "type": "application/hal+json; name=table"
      }
    },
    "_embedded": {
      "revenue_center": {
        "default": true,
        "id": "1",
        "name": "Test",
        "pos_id": "1",
        "_links": {
          "open_tickets": {
            "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/tickets/?where=and(eq(open,true),eq(@revenue_center.id,'1'))" ,
            "type": "application/hal+json; name=ticket_list"
          },
          "self": {
            "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/revenue_centers/1/" ,
            "type": "application/hal+json; name=revenue_center"
          },
          "tables": {
            "href": "https://api.omnivore.io/1.0/locations/Tx9xxdLc/tables/?where=eq(@revenue_center.id,'1')" ,
            "type": "application/hal+json; name=table_list"
          }
        }
      }
    }
  }
]


console.log(tables.filter(t => t.available).reduce((acc, curr) => curr.seats + acc, 0));