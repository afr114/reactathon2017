import React from 'react';

const RestaurantInfo = (props) => {
  return (
    <div className="info-container">
      <h1>{props.restaurantName}</h1>
      <p> Discount: </p>
      <p>{props.type}</p>
      <p>{props.location}</p>
      
    </div>
  )
}

export default RestaurantInfo;
