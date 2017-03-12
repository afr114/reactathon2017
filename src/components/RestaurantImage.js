import React from 'react';

const RestaurantImage = (props) => {
  return (
    <div className="image-container">
      <img src={props.imgUrl} alt={props.alt} className="image-size"/>
    </div>
  )
}

export default RestaurantImage;
