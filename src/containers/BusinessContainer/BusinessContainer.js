import React, { Component } from 'react';
import './BusinessContainer.css';
import DiscountsTable from '../../components/DiscountsTable';

class BusinessContainer extends Component {
  render() {
    const business = {
      name: 'Business Name',
      image: 'Business image',
      discounts: [
      {
        id: 1,
        dealDayOfWeek: [ 'monday', 'tuesday', 'wednesday'],
        dealPercentActivated: 20,
        dealPercentDiscount: 30,
      },
      {
        id: 2,
        dealDayOfWeek: [ 'tuesday' ],
        dealPercentActivated: 20,
        dealPercentDiscount: 40,
      },
      {
        id: 3,
        dealDayOfWeek: [ 'monday' ],
        dealPercentActivated: 20,
        dealPercentDiscount: 30,
      }]
    }
    return (
      <div className="container-fluid">
        <h1>{business.name}</h1>
        <DiscountsTable discounts={business.discounts}/>
      </div>
    );
  }
}

export default BusinessContainer;
