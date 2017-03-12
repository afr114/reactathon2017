import React, { Component } from 'react';
import { getRestauntInfo } from '../utils';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: '' };

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		this.setState({ term: event.target.value })
	}

	onFormSubmit(event) {
		event.preventDefault();
		// this.props.getRestauntInfo(this.state.term);
		this.setState({ term: '' });
	}

	render() {
		return (
		<div className="flex-search-container">
			<form onSubmit={this.onFormSubmit} className="input-group" id="search-form">
				<input
					placeholder="Search Restaurants"
					className="form-control"
					value={this.state.term}
					onChange={this.onInputChange} />
				<span className="input-group-btn">
					<button type="submit" className="btn btn-secondary red">
						<i className="fa fa-search fa-lg white" aria-hidden="true"></i>
					</button>
				</span>
			</form>
		</div>
		);
	}
}
