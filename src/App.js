import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {term: ""};
    this.state = {beers: []}
  }

  componentDidMount(){
    this.getBeers();
  }

  onChange = (event) => {
    this.setState({term: event.target.value});
    console.log(this.state.term);
  }

  getBeers(){
    const URL = "https://api.punkapi.com/v2/beers";
    axios.get(URL)
    .then((response) => {
      this.setState({beers: response.data})
      console.log(this.state.beers);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
      <nav className="navbar navbar-default navbar-color">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Beans Love Beers</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Home</a></li>
            <li><a href="#">Favorites</a></li>
          </ul>
        </div>
      </nav>
        <div className="container ">
          <div className="search-form">
              <form className='input-group'>
              <input 
              className='form-control'
              placeholder='Search for Beer..'
              value={this.state.term}
              onChange={this.onChange}
              />
              <span className='input-group-btn'>
                  <button type='submit' className='btn btn-primary'>Submit</button>
              </span>
            </form>
          </div>
         <div>
            {this.state.beers.map((beer) => {
              return(
                <div className="card" key={beer.id} style={{margin: 5}}>
                <div className="row" style={{padding: 5}}>
                <div className="col-md-3">
                  <div className="d-flex justify-content-center">
                    <img src={beer.image_url} style={image} alt="beer image" />
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                      <h5 className="card-title">{beer.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{beer.tagline}</h6>
                      <h6 className="card-subtitle mb-2 text-muted">{beer.first_brewed}</h6>
                      <br />
                      <p className="card-text">{beer.description}</p>
                  </div>
                </div>
                <div className="w-100"></div>
                </div>
             </div>
              );
            })}
         </div>
        </div>
      </div>
    );
  }
}

const image = {
  height: 200,
  width: 200
};

export default App;
