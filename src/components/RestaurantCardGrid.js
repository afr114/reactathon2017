import React, { Component } from 'react';

export default class RestaurantCardGrid extends Component {
  render() {
    return (
      <div className="flex-card-grid">
        <div className="content-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}
