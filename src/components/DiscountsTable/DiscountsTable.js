import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, Glyphicon } from 'react-bootstrap';
import Multiselect from 'react-bootstrap-multiselect';
import './DiscountsTable.css';

const dropdownDays = {
  'M': 'Monday',
  'TU': 'Tuesday',
  'W': 'Wednesday',
  'TH': 'Thursday',
  'F': 'Friday',
  'SA': 'Saturday',
  'SU': 'Sunday',
}

const daysFormatter = (cell, row) => (<span>{ (cell.map(c => dropdownDays[c]) || []).join(', ') }</span>);
const createDaysEditor = (onUpdate, props) => (<DaysEditor onUpdate={ onUpdate } {...props}/>);
const days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];

class DaysEditor extends Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      days: props.defaultValue,
    };
    this.onToggleDay = this.onToggleDay.bind(this);
  }

  focus() {
  }

  onToggleDay(day) {
    if (this.state.days.indexOf(day) < 0) {
      this.setState({ days: this.state.days.concat([ day ]) });
    } else {
      this.setState({ days: this.state.days.filter(r => r !== day) });
    }
  }

  updateData() {
    this.props.onUpdate(this.state.days);
  }

  render() {
    // @TODO add animation
    const keys = Object.keys(dropdownDays);
    const dayCheckBoxes = keys.map(key => {
      const day = dropdownDays[key];
      const styleName = `day-item ${(this.state.days.indexOf(key) > -1) ? 'active' : ''}`;
      return (
        <div key={ `span-${key}` } className={styleName}>
          <label className="day-label" key={ `label-${key}` } htmlFor={ key } onClick={() => this.onToggleDay(key)}>
            <input
              className="day-checkbox"
              type='checkbox'
              key={ key }
              name={ key }
              checked={ this.state.days.indexOf(key) > -1 }
            />
            { day }
          </label>
        </div>
      );
    });
    return (
      <div className="day-wrapper" ref='inputRef'>
        { dayCheckBoxes }
        <button
          className='btn btn-info btn-xs textarea-save-btn'
          onClick={ this.updateData }>
          save
        </button>
      </div>
    );
  }
}

class DiscountsTable extends Component {
  render() {
    const cellEditProp = {
      mode: 'click'
    };

    const controlButtons = (cell, row) => {
      if (typeof cell === 'string' && cell.indexOf('temp_') > -1) {
        return (
          <div>
            <Button className="day-save" key={`edit_${cell}`} bsStyle="success" onClick={() => this.props.create(row)}><Glyphicon glyph="ok" /></Button>
            <Button key={`delete_${cell}`} bsStyle="danger" onClick={() => this.props.delete(cell)}><Glyphicon glyph="trash" /></Button>
          </div>
        );
      } else {
        return <Button bsStyle="warning" onClick={() => this.props.update(cell)}><Glyphicon glyph="edit" /></Button>;
      }
    };

    // @TODO Add tooltips to explain what the columns mean
    return (
      <BootstrapTable data={this.props.discounts} striped={true} hover={true} cellEdit={cellEditProp}>
        <TableHeaderColumn dataField="title" dataAlign="center">Name</TableHeaderColumn>
        <TableHeaderColumn dataField="dayOfWeek" dataAlign="center" dataFormat={ daysFormatter }
            customEditor={ { getElement: createDaysEditor } } editColumnClassName="day-dropdown">Day of the Week</TableHeaderColumn>
        <TableHeaderColumn dataField="percentActivated" dataAlign="center">Occupancy %</TableHeaderColumn>
        <TableHeaderColumn dataField="percentDiscount" dataAlign="center">Discount %</TableHeaderColumn>
        <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" editable={ false } dataFormat={ controlButtons }></TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default DiscountsTable;
