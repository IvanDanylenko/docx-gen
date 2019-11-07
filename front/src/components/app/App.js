import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.scss';

import OrderGenerationForm from '../order-generation-form';

class App extends Component {
  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/tactics" component={TacticsPage} exact />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
        {/* <OrderGenerationForm /> */}
      </div>
    );
  }
}

export default App;
