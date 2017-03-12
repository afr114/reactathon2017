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
          percentActivated: 0.5,
          percentDiscount: 0.3,
        },
        {
          id: 2,
          title: '40% off at 20% occ',
          dayOfWeek: [ 'TU' ],
          percentActivated: 0.2,
          percentDiscount: 0.4,
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
    update[formField] = event.target.value;
    // overwrite the property that is being updated and merge the reset of the properties
    const formInput = Object.assign({}, this.state.formInput, update);
    this.setState({ formInput } );

    this.handleUpdate = this.handleUpdate.bind(this);
  }


  handleCreate() {
    var formData = Object.assign({}, this.state.formInput, {text: '', rid: '12345'});
    console.log(formData);
    request.post({
      method:'POST', url:'https://dyftmauijc.execute-api.us-east-1.amazonaws.com/dev/deals', body:JSON.stringify(formData), json:true, withCredentials: true},
      function(resp) {
        console.log(resp);
        this.toggleModal()
    });
//    console.log('Creating logic')
//    const business = this.state.business;
//    business.discounts.push({
//      dayOfWeek: [],
//      percentActivated: '',
//      percentDiscount: '',
//    })
//    // @TODO Focus on first field
//    this.setState({ business });
  }

  handleUpdate() {
    console.log('UPDATING LOGIC');
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>{this.state.business.name}</h1>
        <Button bsStyle="success" onClick={this.toggleModal} className="create-button"><Glyphicon glyph="plus" /> New Discount</Button>
        <DiscountsTable
          discounts={this.state.business.discounts}
          update={this.handleUpdate}
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
                id='dayOfWeek'
                value={this.state.formInput.dayOfWeek}
                onChange={this.onInputChange} />
              <input
                placeholder="0.5"
                className="form-control"
                id='percentActivated'
                value={this.state.formInput.percentActivated}
                onChange={this.onInputChange} />
              <input
                placeholder="0.2"
                className="form-control"
                id='percentDiscount'
                value={this.state.formInput.percentDiscount}
                onChange={this.onInputChange} />
              <span className="input-group-btn">
                <Button onClick={this.handleCreate} className="btn btn-primary">
                  <i className="fa fa-plus fa-lg white" aria-hidden="true"></i>
                </Button>
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
