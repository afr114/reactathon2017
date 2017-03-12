import React from 'react';

const RestaurantImage = (props) => {
  return (
    <div className="image-container">
      <img src={props.imgUrl} alt={props.alt} height={'248px'}/>
    </div>
  )
}

export default RestaurantImage;
