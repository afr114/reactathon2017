import React, { Component } from 'react';
import { Button, Glyphicon, Modal } from 'react-bootstrap';
import './BusinessContainer.css';
import DiscountsTable from '../../components/DiscountsTable';

class BusinessContainer extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showModal: false,
      formInput: {
        title: '', 
        dealDayOfWeek: '',
        dealPercentActivated: '',
        dealPercentDiscount: ''
      },
      business: {
        name: 'Business Name',
        discounts: [
        {
          id: 1,
          title: '20% off at 50% occ',
          dealDayOfWeek: [ 'M', 'TU', 'W' ],
          dealPercentActivated: 0.5,
          dealPercentDiscount: 0.3,
        },
        {
          id: 2,
          title: '40% off at 20% occ',
          dealDayOfWeek: [ 'TU' ],
          dealPercentActivated: 0.2,
          dealPercentDiscount: 0.4,
        }]
      }
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    //this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.toggleModal });
  }

  onInputChange(event) {
    const formField = event.target.id
    let update = {}
    console.log()

    // overwrite the property that is being updated and merge the reset of the properties
    switch (formField) {
      case 'title':
        update = { title: event.target.value };
        break;
      case 'dealDayOfWeek':
        update = { dealDayOfWeek: event.target.value }
        break;
      case 'dealPercentActivated':
        update = { dealPercentActivated: event.target.value }
        break;
      case 'dealPercentDiscount':
        update = { dealPercentDiscount: event.target.value }
        break;
      default:
        break;
    }
    const formInput = Object.assign({}, this.state.formInput, update);
    console.log(formInput)
    this.setState({ formInput } );
    
    
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
        <Button bsStyle="success" onClick={this.toggleModal}><Glyphicon glyph="plus" /> New</Button>
        <DiscountsTable
          discounts={this.state.business.discounts}
        />
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new deal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.onFormSubmit} className="input-group" id="deal-form">
              <input
                placeholder="deal name"
                className="form-control"
                id='title'
                value={this.state.formInput.title}
                onChange={this.onInputChange} />
              <input
                placeholder='["SU", "M","TU","W","TH","F","SA"]'
                className="form-control"
                id='dealDayOfWeek'
                value={this.state.formInput.dealDayOfWeek}
                onChange={this.onInputChange} />
              <input
                placeholder="0.5"
                className="form-control"
                id='dealPercentActivated'
                value={this.state.formInput.dealPercentActivated}
                onChange={this.onInputChange} />
              <input
                placeholder="0.2"
                className="form-control"
                id='dealPercentDiscount'
                value={this.state.formInput.dealPercentDiscount}
                onChange={this.onInputChange} />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-secondary blue">
                  <i className="fa fa-plus fa-lg white" aria-hidden="true"></i>
                </button>
              </span>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default BusinessContainer;
