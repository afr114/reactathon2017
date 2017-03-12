import React, { Component } from 'react';
import RestaurantImage from './RestaurantImage';
import RestaurantInfo from './RestaurantInfo';

export default class RestaurantCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(reservationUrl) {
    window.location = reservationUrl;
  }

  render() {
    return (
      <div className="restaurant-card" onClick={this.handleClick.bind(this, this.props.reservationUrl)}>
        <div className="flex-row">
        <RestaurantImage {...this.props.img}/>
        <RestaurantInfo {...this.props}/>
        </div>
      </div>
    )
  }
}
