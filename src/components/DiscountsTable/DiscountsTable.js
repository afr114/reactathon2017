import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class DiscountsTable extends Component {
  render() {
    // @TODO Add tooltips to explain what the columns mean
    // @TODO Select different days logic
    return (
      <BootstrapTable data={this.props.discounts} striped={true} hover={true}>
        <TableHeaderColumn dataField="dayOfWeek" isKey={true} dataAlign="center">Day of the Week</TableHeaderColumn>
        <TableHeaderColumn dataField="percentActivated" dataAlign="center">Occupancy %</TableHeaderColumn>
        <TableHeaderColumn dataField="percentDiscount" dataAlign="center">Discount %</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default DiscountsTable;
