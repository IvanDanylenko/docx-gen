import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import './App.scss';

import HomePage from '../home-page/home-page';
import TacticsPage from '../tactics-page/tactics-page';

class App extends Component {
  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <nav className="navbar navbar-dark bg-dark">
            <ul className="navbar-nav flex-row">
              <li className="nav-item mr-2"><Link to="/" className="nav-link">Главная</Link></li>
              <li className="nav-item"><Link to="/tactics" className="nav-link">Тактика</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/tactics" component={TacticsPage} exact />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
