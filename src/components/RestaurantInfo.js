import React from 'react';
import Stars from './Stars';

const RestaurantInfo = (props) => {
  return (
    <div className="info-container">
      <h1>{props.restaurantName}</h1>
      <p> Discount: </p>
      <p>{props.type}</p>
      <p>{props.location}</p>
      <Stars stars={props.stars}/>
    </div>
  )
}

export default RestaurantInfo;
