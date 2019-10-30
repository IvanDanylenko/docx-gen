import React, { Component } from 'react';
import './App.scss';

import OrderGenerationForm from '../order-generation-form';

class App extends Component {
  render () {
    return (
      <div className="App">
        <OrderGenerationForm />
      </div>
    );
  }
}

export default App;
