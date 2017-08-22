import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    require('./src/Perceptron');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Perceptrons</h2>
        </div>
        <canvas id="canv" height="500" width="500" />
      </div>
    );
  }
}

export default App;
