import React, { Component } from 'react';
import Stars from './Stars';

export default class RestaurantInfo extends Component {
  componentDidMount() {
    fetch('https://dyftmauijc.execute-api.us-east-1.amazonaws.com/dev/deals')
  }
  render() {
    return (
      <div className="info-container">
        <h1>{this.props.restaurantName}</h1>
        <p> Discount: {this.props.discount}</p>
        <p>{this.props.type}</p>
        <p>{this.props.location}</p>
        <Stars stars={this.props.stars}/>
      </div>
    )
  }
}
