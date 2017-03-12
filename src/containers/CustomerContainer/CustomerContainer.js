import React, { Component } from 'react';
import './CustomerContainer.css';
import SearchBar from '../../components/SearchBar';
import { getRestaurants } from '../../opentableHelper.js';
import RestaurantCardGrid from '../../components/RestaurantCardGrid';
import RestaurantCard from '../../components/RestaurantCard';
import { listings } from '../../listings.js'

console.log(SearchBar)
class CustomerContainer extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      restaurants: [],
      rlistings: listings,
      isLoaded: false,
      hasError: false,
    }
    this.getAllRestaurants = this.getAllRestaurants.bind(this);
  }

  getAllRestaurants(geoLocation) {
    console.log(' fuuuu');
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

  render() {
    return (
      <div className="customer-container">
        <RestaurantCardGrid>
          <SearchBar/>
          {this.state.rlistings ? this.state.rlistings.map( function(list) {
            return <RestaurantCard {...list}/>
          }): null }
        </RestaurantCardGrid>
      </div>
    );
  }
}

export default CustomerContainer;
