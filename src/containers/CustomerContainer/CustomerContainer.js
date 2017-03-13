import React, { Component } from 'react';
import './CustomerContainer.css';
import SearchBar from '../../components/SearchBar';
import { getRestaurants } from '../../opentableHelper.js';
import RestaurantCardGrid from '../../components/RestaurantCardGrid';
import RestaurantCard from '../../components/RestaurantCard';
import { listings } from '../../listings.js'

class CustomerContainer extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      restaurants: [],
      rlistings: listings,
      isLoaded: false,
      hasError: false,
      searchTerm: '',
    }
    this.getAllRestaurants = this.getAllRestaurants.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  getAllRestaurants(geoLocation) {
    getRestaurants(geoLocation)
      .then(restaurants => this.setState({ restaurants, isLoaded: true }))
      .catch(err => this.setState({ isLoaded: true, hasError: true }));
  }

  componentDidMount() {
    // Around Github Office
    const defaultLocation = { lat: 37.784624, lng: -122.395889 };
    if (!this.state.isLoaded) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            location => this.getAllRestaurants({ lat: location.coords.latitude, lng: location.coords.longitude }),
            () => this.getAllRestaurants(defaultLocation)
        );
      } else {
        this.getAllRestaurants(defaultLocation);
      }
    }
  }

  onSearchChange(searchTerm) {
    if (!searchTerm || searchTerm === '') {
      this.setState({ searchTerm: '' });
    } else {
      this.setState({ searchTerm });
    }
  }

  render() {
    const restaurants = this.state.searchTerm.length > 0 ?
      this.state.rlistings.filter(r => (r.restaurantName.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1)) :
      this.state.rlistings;

    return (
      <div className="customer-container">
        <RestaurantCardGrid>
          <SearchBar onSearch={this.onSearchChange}/>
          {restaurants.map(list => <RestaurantCard id={list.rid} key={list.rid} {...list}/>)}
        </RestaurantCardGrid>
      </div>
    );
  }
}

export default CustomerContainer;
