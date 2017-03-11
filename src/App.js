import React, { Component } from 'react';
import CustomerContainer from './containers/CustomerContainer';
import BusinessContainer from './containers/BusinessContainer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    if (window.location.pathname.indexOf('business') > -1) {
      return <BusinessContainer/>;
    }
    return <CustomerContainer/>;
  }
}

export default App;
