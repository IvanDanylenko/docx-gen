import React, { Component } from 'react';
import './order-generation-form.scss';
import Tactics from '../tactics';
import Driving from '../driving';
import WeaponsTraining from '../weapons-training';

export default class OrderGenerationForm extends Component {

  state = {
    order: 'tactics',
    data: {}
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit handled');
  }

  handleOrderChange = (e) => {
    console.log(e.target.value)
    this.setState({ order: e.target.value });
  }

  render() {
    const { order } = this.state;

    return (
      <form className="order-form" onSubmit={this.handleSubmit}>
        <h2>Форма генерації наказів</h2>
        {/* Squadron */}
        <div className="form-group row">
          <label htmlFor="squadron" className="col-sm-2 col-form-label">Виберіть роту</label>
          <div className="col-sm-10">
            <select className="custom-select" defaultValue="1" id="squadron">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        {/* Platoons */}
        <div className="form-group row">
          <label htmlFor="platoons" className="col-sm-2 col-form-label">Укажіть взвод(и)</label>
          <div className="col-sm-10">
            <input id="platoons" type="text" className="form-control"/>
            <small className="form-text text-muted">(Наприклад: 0 - всі взводи; 1,3 - перелік; 1-3 - проміжок)</small>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="exampleInputEmail1">Виберіть вид наказу</label>
          <select onChange={ this.handleOrderChange } className="custom-select" defaultValue="tactics" id="inlineFormCustomSelectPref">
            <option value="tactics">Тактика</option>
            <option value="driving">Водіння</option>
            <option value="weapons-training">Вогнева підготовка</option>
          </select>
        </div>
        { order === 'tactics' ? 
          <Tactics /> : 
          order === 'driving' ?
          <Driving /> :
          order === 'weapons-training' ?
          <WeaponsTraining /> :
          <p>Такий вид наказу не існує</p>
        }
        
        <button type="submit" className="btn btn-primary">Згенерувати</button>
      </form>
    )
  }
}