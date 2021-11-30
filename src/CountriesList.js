import React, { Component } from 'react';
import axios from 'axios';
import "./loader.css";
import CountryCard from './CountryCard';
import {Outlet} from "react-router-dom";

class CountriesList extends Component {
    state = {
        data: [],
        searchInput: "",
        isLoading: true,
      };
      componentDidMount () {
        axios.get("https://restcountries.com/v2/all?fields=name,capital,flags,languages,population,currencies")
        .then((res) => {
          this.setState({data: res.data, isLoading: false});
        });
      }
      searchHandler = (e) => {
        this.setState({
          searchInput: e.target.value,
        });
      };

      render() {

      if (this.state.isLoading) {
        return <div className="loading"><p>Wait, I am loading</p><div class="loader"></div></div>
      }

      if (!this.state.isLoading) {

        return (
    <div className="countries">
        <Outlet />
        <input 
        type="text" 
        name="search" 
        onChange={this.searchHandler.bind(this)}
        />
        {this.state.data
       .filter((c) => {
         return c.name.toLowerCase().includes(this.state.searchInput.toLowerCase());
       }).map((country) => (
        <CountryCard {...country} key={country.name} />
       ))}
            </div>
        );
    }
}
  }

export default CountriesList;
