import React, { Component } from 'react';
import { Button, Glyphicon, Modal } from 'react-bootstrap';
import './BusinessContainer.css';
import Stars from '../../components/stars';
import DiscountsTable from '../../components/DiscountsTable';
import request from 'browser-request';


class BusinessContainer extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showModal: false,
      formInput: {
        title: '',
        dayOfWeek: '',
        percentActivated: '',
        percentDiscount: ''
      },
      business: {
        name: 'Business Name',
        discounts: [
        {
          id: 1,
          title: '20% off at 50% occ',
          dayOfWeek: [ 'M', 'TU', 'W' ],
          percentActivated: 50,
          percentDiscount: 30,
        },
        {
          id: 2,
          title: '40% off at 20% occ',
          dayOfWeek: [ 'TU' ],
          percentActivated: 20,
          percentDiscount: 40,
        }]
      }
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleCreateRow = this.handleCreateRow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.toggleModal });
  }

  handleCreate(object) {
    const data = {
      text: '',
      rid: '12345',
      title: object.title,
      dayOfWeek: object.dayOfWeek,
      percentActivated: object.percentActivated / 100,
      percentDiscount: object.percentDiscount / 100,
    }
    console.log(data);
    request.post({
      method:'POST', url:'https://dyftmauijc.execute-api.us-east-1.amazonaws.com/dev/deals', body:JSON.stringify(data), json:true, withCredentials: true},
      function(resp) {
        // @TODO update with id
        console.log(resp);
    });
  }

  handleCreateRow() {
    const business = this.state.business;
    business.discounts.push({
      id: `temp_${business.discounts.length}`,
      dayOfWeek: [],
      percentActivated: 0,
      percentDiscount: 0,
    })
    // @TODO Focus on first field
    this.setState({ business });
  }

  handleDelete(id) {
    const business = this.state.business;
    business.discounts = business.discounts.filter(d => d.id !== id);
    this.setState({ business });
  }

  handleUpdate() {
    console.log('UPDATING LOGIC');
  }

  render() {
    return (
      <div className="container-fluid">
        <Stars stars={4}/>
        <h1>{this.state.business.name}</h1>
        <Button bsStyle="success" onClick={this.handleCreateRow} className="create-button"><Glyphicon glyph="plus" /> New Discount</Button>
        <DiscountsTable
          discounts={this.state.business.discounts}
          update={this.handleUpdate}
          create={this.handleCreate}
          delete={this.handleDelete}
        />
      </div>
    );
  }
}

export default BusinessContainer;
