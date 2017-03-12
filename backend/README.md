
## Customer Facing Routes:

__https://dyftmauijc.execute-api.us-east-1.amazonaws.com/dev/currentDeals__
  __GET:__
    Returns an array of non-archived deals where current capacity is less than deal threshold like:
    ```{
      currentDeals: [
        {
          id: "123456789", // Deal UUID
          dealTitle: "Title Business Uploaded",
          dealText: "Text Description Business Uploaded", 
          dealPercentActivated: "0.2", // deal activated when % avalibile crosses this threshold
          dealPercentDiscount: "0.25", // the percent discount being offered to the customer
          dealDayOfWeek: ["SU", "M","TU","W","TH","F","SA"], // days of the week that the deal is avalibile
          dealRestaurantID: '123456789', // restaurant UUID from open table
          dealArchived: false, // whether deal is still valid
          createdAt: 123456789, // Unix timestamp
          updatedAt: timestamp, // Unix timestamp
        }, 
        {
          // ...
        }
      ]
    }```

## Business Facing Routes 

__https://dyftmauijc.execute-api.us-east-1.amazonaws.com/dev/deals__
  __GET:__
    Returns a list of deals the restaurant has configured like:

    [
      {
        id: "123456789", // Deal UUID
        dealTitle: "Title Business Uploaded",
        dealText: "Text Description Business Uploaded", 
        dealPercentActivated: "0.2", // deal activated when % avalibile crosses this threshold
        dealPercentDiscount: "0.25", // the percent discount being offered to the customer
        dealDayOfWeek: ["SU", "M","TU","W","TH","F","SA"], // days of the week that the deal is avalibile
        dealRestaurantID: '123456789', // restaurant UUID from open table
        dealArchived: false, // whether deal is still valid
        createdAt: 123456789, // Unix timestamp
        updatedAt: timestamp, // Unix timestamp
      }, 
      {
        // ...
      }
    ]

  __POST:__
    Create a new deal, expects a JSON body like:

    ```{
      "title": "a title",
      "text": "description of the deal",
      "percentActivated": "0.2",
      "percentDiscount": "0.25",
      "dayOfWeek": ["M","TU","W","TH","F","SA","SU"],
      "rid": "openTableUUID"
    }```
  
__https://dyftmauijc.execute-api.us-east-1.amazonaws.com/dev/deals/{id}}__
  __PUT:__
    Update an existing deal, expects a JSON body like:
    ```{
      "text": "description of the deal",
      "dealArchived": "false"
    }```

