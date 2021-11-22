import './App.css';
import axios from 'axios'
import React, { Component } from 'react';

class App extends Component {
  state = {
    data: [],
  };

componentDidMount () {
  axios.get("https://restcountries.com/v3.1/all")
  .then((res) => {
    this.setState({data: res.data});
  });
}

  render() {
    return (
      <div className="countries">
       {this.state.data.map((c) => (
       <div className="country" key={c.name.common}>
         <h2>{c.name.common}</h2> <p>{c.capital}</p>
      <img src={c.flags.svg} />
      </div>
       ))}
      </div>
    );
  }
}

export default App;