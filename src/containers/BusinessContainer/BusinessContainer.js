import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import './BusinessContainer.css';
import DiscountsTable from '../../components/DiscountsTable';

class BusinessContainer extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      business: {
        name: 'Business Name',
        discounts: [
        {
          id: 1,
          dealDayOfWeek: [ 'monday', 'tuesday', 'wednesday' ],
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
    };
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate() {
    console.log('Creating logic')
    const business = this.state.business;
    business.discounts.push({
      dealDayOfWeek: [],
      dealPercentActivated: '',
      dealPercentDiscount: '',
    })
    // @TODO Focus on first field
    this.setState({ business });
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>{this.state.business.name}</h1>
        <Button bsStyle="success" onClick={this.handleCreate}><Glyphicon glyph="plus" /> New</Button>
        <DiscountsTable
          discounts={this.state.business.discounts}
        />
      </div>
    );
  }
}

export default BusinessContainer;
