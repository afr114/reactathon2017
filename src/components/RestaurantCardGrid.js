import React, { Component } from 'react';

export default class RestaurantCardGrid extends Component {
  render() {
    return (
      <div className="flex-card-grid">
        {this.props.children}
      </div>
    )
  }
}
