import React, { Component } from 'react';

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
		var location = this.state.searchTerm;
		var location = location.replace(/\s+/g, '+');
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyAY7_4Ja1beJEByz8uTmziyb7lmQld7B0s';
			fetch(url)
			.then(function (r) { return r.json(); })
			.then(function (data) {
				console.log ({
					lat: data.results[0].geometry.location.lat,
					lng: data.results[0].geometry.location.lng
				});
		})
		.catch(function (e) { console.log('oops'); });
		
		this.setState({ searchTerm: '' });
	}

	render() {
		return (
		<div className="flex-search-container">
			<form onSubmit={this.onFormSubmit} className="input-group" id="search-form">
				<input
					placeholder="Enter Location"
					className="form-control"
					value={this.state.searchTerm}
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
