import './App.css';
import axios from 'axios'
import React, { Component } from 'react';
import number from "easy-number-formatter";


class App extends Component {
  state = {
    data: [],
    searchInput: "",
    isLoading: true,
  };

componentDidMount () {
  axios.get("https://restcountries.com/v2/all?fields=name,capital,flags,languages,population,currencies")
  .then((res) => {
    this.setState({data: res.data, isLoading: false});
    console.log(this.state.data);
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
        <input 
        type="text" 
        name="search" 
        onChange={this.searchHandler.bind(this)}
        />
       {this.state.data
       .filter((c) => {
         return c.name.toLowerCase().includes(this.state.searchInput.toLowerCase());
       }).map((c) => (
       <div className="country" key={c.name}>
         <h2>{c.name}</h2> <h3>{c.capital}</h3>
      <img src={c.flags.png} alt={c.name} />
      <div className="cardContent">
        <p>
          Language(s):
          {c.languages.map((lang, i)=> (
            <span key={i}>{lang.name}</span>
          ))}
        </p>
        <p>
          Currencies:
          {c.currencies.map((mon, i) => (
            <span key={i}>
              {mon.name} - {mon.symbol}
              </span>
          ))}
        </p>
        <p>Population:
          <span className="low">{number.formatNumber(c.population)}</span></p>
        </div>
      </div>
       ))}
       </div>
      );
  }
}}

export default App;