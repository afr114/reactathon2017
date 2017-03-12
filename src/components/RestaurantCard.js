import React, { Component } from 'react';
import RestaurantImage from './RestaurantImage';
import RestaurantInfo from './RestaurantInfo';

export default class RestaurantCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="restaurant-card">
        <div className="flex-row">
        <RestaurantImage {...this.props.img}/>
        <RestaurantInfo {...this.props}/>
        </div>
      </div>
    )
  }
}
