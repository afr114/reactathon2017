import React, { Component } from 'react';
import RestaurantImage from './RestaurantImage';
import RestaurantInfo from './RestaurantInfo';
import OpenTableWidget from './OpenTableWidget';
import Stars from './Stars';

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
      <div className="restaurant-card flex-wrapper">
          <div className="image-container">
            <img src={this.props.img.imgUrl} alt={this.props.img.alt} className="image-size"/>
          </div>
          <div className="info-container">
            <h1 className="no-margin-top">{this.props.restaurantName}</h1>
            <p> Discount: {this.props.discount}</p>
            <p>{this.props.type}</p>
            <p>{this.props.location}</p>
            <Stars parentKey={this.props.key}stars={this.props.stars}/>
          </div>
          <div className="opentable-widget">
            <OpenTableWidget rid={this.props.rid}/>
          </div>
      </div>
    )
  }
}
