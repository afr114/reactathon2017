import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import './BusinessContainer.css';
import DiscountsTable from '../../components/DiscountsTable';
import request from 'browser-request';
var BarChart = require("react-chartjs").Bar;
var $ = require('jquery')
require('chart.js')


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
        name: 'Bouche',
        discounts: [
        {
          id: 1,
          title: '20% off',
          dayOfWeek: [ 'M', 'TU', 'W' ],
          percentActivated: 50,
          percentDiscount: 30,
        },
        {
          id: 2,
          title: '40% off',
          dayOfWeek: [ 'TU' ],
          percentActivated: 20,
          percentDiscount: 40,
        }]
      },
      focusLastRow: false,
      chartData: {
        labels: ["M", "T", "W", "R", "F", "S", "S"],
        datasets: [{
           fillColor: ["#EDE9A3","#D7C37A","#1B8057","#55A44E","#625772","#EDE9A3" ],
            strokeColor: "rgba(220,220,220,0.8)", 
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
          label: 'Discounted',
          data: [40, 30, 70, 40, 10, 10, 30]
        }, {
          label: 'Non-Discounted',
          data: [40, 65, 30, 50, 80, 85, 60]
        }]
      },
      chartOptions:  {
          scales:{
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
            stacked: true
            }]
        }
      }
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleCreateRow = this.handleCreateRow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.getDeals = this.getDeals.bind(this);
  }



  getDeals() {
    $.ajax({
        url: 'https://dyftmauijc.execute-api.us-east-1.amazonaws.com/dev/deals',
        type: 'json',
        crossDomain: true,
        contentType: 'application/json',
        success: function(data) {
            console.log('data')
        },
        method: 'get',
    });
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

    const business = this.state.business;
    business.discounts = business.discounts.map(d => {
      if (d.id === object.id) {
        d.id = `saved_${object.id.split('temp_')[0]}`;
      }
      return d;
    })
    this.setState({
      business,
      focusLastRow: false
    });
    return request.post({
      method:'POST', url:'https://dyftmauijc.execute-api.us-east-1.amazonaws.com/dev/deals', body:JSON.stringify(data), json:true },
      function(error, resp, body) {
        return;
        // const business = this.state.business;
        // business.discounts = business.discounts.map(d => {
        //   if (d.id === object.id) {
        //     return {
        //       id: resp.id,
        //       title: resp.title,
        //       dayOfWeek: resp.dayOfWeek,
        //       percentActivated: resp.percentActivated * 100,
        //       percentDiscount: resp.percentDiscount * 100,
        //     }
        //   }
        //   return d;
        // })
        // this.setState({
        //   business,
        //   focusLastRow: false
        // });
        // // Hardcoded

      }
    )
  }

  handleCreateRow() {
    const business = this.state.business;
    business.discounts.push({
      id: `temp_${business.discounts.length}`,
      title: '',
      dayOfWeek: [],
      percentActivated: 0,
      percentDiscount: 0,
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
  console.log(this.state.chartOptions)   
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
        <h3>Last week's revenue</h3>
        <BarChart data={this.state.chartData} options={this.state.chartOptions} width="600" height="250"/>
      </div>

    );
  }
}

export default BusinessContainer;
