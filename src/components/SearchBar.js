import React, { Component } from 'react';
import { getLocationInfo } from './google_api.js';

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = { searchTerm: '' };

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		this.setState({ searchTerm: event.target.value })
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.getLocationInfo(this.state.searchTerm);
		this.setState({ searchTerm: '' });
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className="input-group">
				<input
					placeholder="Enter Location"
					className="form-control"
					value={this.state.searchTerm}
					onChange={this.onInputChange} />
				<span className="input-group-btn">
					<button type="submit" className="btn btn-secondary">Submit</button>
				</span>
			</form>
		);
	}
}
