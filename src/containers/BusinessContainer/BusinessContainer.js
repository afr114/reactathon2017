import React, { Component } from 'react';
import { Button, Glyphicon, Modal } from 'react-bootstrap';
import './BusinessContainer.css';
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
      },
      focusLastRow: false,
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
      text: 'Text Description',
      rid: '12345',
      title: object.title,
      dayOfWeek: object.dayOfWeek,
      percentActivated: object.percentActivated / 100,
      percentDiscount: object.percentDiscount / 100,
    }
    return request.post({
      method:'POST', url:'https://dyftmauijc.execute-api.us-east-1.amazonaws.com/dev/deals', body:JSON.stringify(data), json:true },
      function(error, resp, body) {
        console.log(error, resp, body)
        const business = this.state.business;
        business.discounts = business.discounts.map(d => {
          if (d.id === object.id) {
            return {
              id: resp.id,
              title: resp.title,
              dayOfWeek: resp.dayOfWeek,
              percentActivated: resp.percentActivated * 100,
              percentDiscount: resp.percentDiscount * 100,
            }
          }
          return d;
        })
        this.setState({
          business,
          focusLastRow: false
        });
    })
  }

  handleCreateRow() {
    const business = this.state.business;
    business.discounts.push({
      id: `temp_${business.discounts.length}`,
      title: '',
      dayOfWeek: [],
      percentActivated: 10,
      percentDiscount: 10,
    })
    // @TODO Focus on first field
    this.setState({ business, focusLastRow: true });
  }

  handleDelete(id) {
    const business = this.state.business;
    business.discounts = business.discounts.filter(d => d.id !== id);
    this.setState({ business });
    this.setState({ focusLastRow: false });
  }

  handleUpdate() {
    console.log('UPDATING LOGIC');
    this.setState({ focusLastRow: false });
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>{this.state.business.name}</h1>
        <Button bsStyle="success" onClick={this.handleCreateRow} className="create-button"><Glyphicon glyph="plus" /> New Discount</Button>
        <DiscountsTable
          focusLastRow={this.state.focusLastRow}
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
