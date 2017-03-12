import React, { Component } from 'react';
import './BusinessContainer.css';
import DiscountsTable from '../../components/DiscountsTable';

class BusinessContainer extends Component {
  render() {
    return (
      <div className="business-container">
        This is the business container
        <DiscountsTable />
      </div>
    );
  }
}

export default BusinessContainer;
