import React, { Component } from 'react';
const _ = require('lodash')

export default class Stars extends Component {
  render() {
    var numStars = this.props.stars;
    return (
    <div>
      {_.times(numStars, () =>  <span className='glyphicon glyphicon-star' />)}
    </div>
    );
  }
}
