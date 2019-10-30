import React, { Component } from 'react';

import './tactics.scss';

class Tactics extends Component {

  handlePractiseChange = () => {
    console.log('practise change')
  }

  render() {
    return (
      <div className="tactics-part">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Виберіть види підготовки</label>
          <select onChange={this.handlePractiseChange} multiple className="custom-select form-control" id="inlineFormCustomSelectPref">
            <option value="tactics">Психологічна підготовка</option>
            <option value="driving">Підготовка з РХБ захисту</option>
            <option value="weapons-training">Підготовка зі зв'язку</option>
          </select>
        </div>
      </div>
    )
  }
}

export default Tactics;