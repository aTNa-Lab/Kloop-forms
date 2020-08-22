import React, { Component } from 'react';

const queryString = require('query-string');

class App extends Component {
  state = {
    data: {}
  }

  componentDidMount() {
    this.downloadData()
  }

  downloadData = () => {
    let urlString =  queryString.parse(window.location.search, {decode: false})
    console.log(urlString)
    if (urlString.url) {
      fetch(urlString.url)
      .then((response) => {
        console.log("RESPONSE", response)
        return response.json();
    })
      .then((data) => {
        console.log("DATA", data);
        this.setState({data: data})
      });
    }
    else {
      console.log("ERROR: no url detected")
    }
  }

  render () {
    return (
      <div className="App">
        {console.log("STATE", this.state.data)}
      </div>
    );
  }
}

export default App;
