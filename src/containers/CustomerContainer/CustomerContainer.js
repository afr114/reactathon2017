import React, { Component } from 'react';
import './CustomerContainer.css';
import SearchBar from '../../components/SearchBar';

class CustomerContainer extends Component {
  render() {
    return (
      <div className="customer-container">
        <SearchBar/>
      </div>
    );
  }
}

export default CustomerContainer;
