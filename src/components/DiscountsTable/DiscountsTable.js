import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class DiscountsTable extends Component {
  render() {
    // @TODO Add tooltips to explain what the columns mean
    // @TODO Select different days logic
    return (
      <BootstrapTable data={this.props.discounts} striped={true} hover={true}>
        <TableHeaderColumn dataField="dealDayOfWeek" isKey={true} dataAlign="center">Day of the Week</TableHeaderColumn>
        <TableHeaderColumn dataField="dealPercentActivated" dataAlign="center">Occupancy %</TableHeaderColumn>
        <TableHeaderColumn dataField="dealPercentDiscount" dataAlign="center">Discount %</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default DiscountsTable;
