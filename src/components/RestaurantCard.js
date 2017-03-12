import React, { Component } from 'react';
import RestaurantImage from './RestaurantImage';

export default class RestaurantCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="restaurant-card">
        <RestaurantImage/>
      </div>
    )
  }
}
