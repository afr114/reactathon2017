import React, { Component } from 'react';
var ReactDOM = require('react-dom');

export default class OpenTableWidget extends Component {
  componentDidMount() {
      const script = document.createElement("script");

      script.src = "https://www.opentable.com/widget/reservation/loader?rid=102871&domain=com&type=standard&theme=standard&lang=en&overlay=false&iframe=true";
      script.async = true;
      
      ReactDOM.findDOMNode(this).appendChild(script);
  }
  render() {
    return (
      <div></div>
    )
  }
}


