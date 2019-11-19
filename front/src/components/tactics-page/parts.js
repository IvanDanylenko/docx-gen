import React, { Fragment } from 'react'
import exercise_chiefs from '../../database/exercise_chiefs.json';
import ReactSelectInput from 'react-select-input';

export const Squadron = ({ squadron, handleSquadronChange }) => {
  return (
    <div className="form-group row">
      <label htmlFor="squadron" className="col-sm-2 col-form-label">Виберіть роту:</label>
      <div className="col-sm-5">
        <select className="custom-select"
          onChange={handleSquadronChange}
          defaultValue="1" id="squadron">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="col-sm-5">
        <span>{squadron}</span>
      </div>
    </div>
  )
}

export const Platoons = ({ platoons, platoons_expanded, handlePlatoonsChange }) => {
  return (
    <div className="form-group row">
      <label htmlFor="platoons" className="col-sm-2 col-form-label">Укажіть взвод(и):</label>
      <div className="col-sm-5">
        <input id="platoons" type="text"
          value={platoons}
          onChange={handlePlatoonsChange}
          className="form-control" />
        <small className="form-text text-muted">(Напр.: 0 або "" - всі взводи; 1,3 - перелік; 1-3 - проміжок)</small>
      </div>
      <div className="col-sm-5">
        <span>{platoons_expanded}</span>
      </div>
    </div>
  )
}

export const DateShort = ({ date, handleDateChange }) => {
  return (
    <div className="form-group row">
      <label htmlFor="date" className="col-sm-2 col-form-label">Дата наказу:</label>
      <div className="col-sm-5">
        <input id="date" type="text" className="form-control"
          value={date}
          onChange={handleDateChange}
          placeholder=".11.19" />
      </div>
      <div className="col-sm-5">
        <span>{date}</span>
      </div>
    </div>
  )
}

export const DateExpanded = ({ date_expanded, handleDateExpandedChange }) => {
  return (
    <div className="form-group row">
      <label htmlFor="date_expanded" className="col-sm-2 col-form-label">Дата словами:</label>
      <div className="col-sm-5">
        <input id="date_expanded" type="text" className="form-control"
          value={date_expanded}
          onChange={handleDateExpandedChange}
          placeholder="Восьмого листопада 2019 року" />
      </div>
      <div className="col-sm-5">
        <span>{date_expanded}</span>
      </div>
    </div>
  )
}

export const Time = ({ time, time_expanded, handleTimeChange, handleTimeAdd }) => {
  return (
    <div className="form-group row">
      <label htmlFor="time" className="col-sm-2 col-form-label">Час проведення:</label>
      <div className="col-sm-5">
        {time.map((item, index) => (
          <select key={index} className="custom-select mb-1"
            onChange={handleTimeChange}
            defaultValue={item}>
            <option value="з 8.00 до 13.05">з 8.00 до 13.05</option>
            <option value="з 17.00 до 22.00">з 17.00 до 22.00</option>
          </select>
        ))}
        {/* <input type="text" className="form-control" placeholder="з 8.00 до 13.05" /> */}
        <button className="btn btn-primary time-add d-block ml-auto"
          onClick={handleTimeAdd}>+</button>
      </div>
      <div className="col-sm-5">
        {time_expanded}
      </div>
    </div>
  )
}

export const Exercises = (props) => {
  return (
    <Fragment>
      <div className="form-group row">
        <label htmlFor="time" className="col-sm-2 col-form-label">Заняття:</label>
        <div className="col-sm-10">
          <div className="row mb-2">
            <div className="col-12 d-flex flex-row">
              <div class="custom-control custom-checkbox mr-3">
                <input type="checkbox"
                  className="custom-control-input" id="mainChief"
                  checked={props.isMainChief}
                  onChange={props.toggleMainChief} />
                <label className="custom-control-label"
                  htmlFor="mainChief">Загальний керівник</label>
              </div>
              <div class="custom-control custom-checkbox">
                <input type="checkbox"
                  className="custom-control-input" id="medicalWorker"
                  checked={props.isPheldsher}
                  onChange={props.togglePheldsher} />
                <label className="custom-control-label"
                  htmlFor="medicalWorker">Черговий фельдшер</label>
              </div>
            </div>
          </div>
          {props.exercises.map((item, index) => {
            return (
              <div key={index} className="row mb-1">
                <div className="col-6">
                  {/* Exercise name */}
                  <select className="custom-select" defaultValue="1" id="exercise_name">
                    <option value="1">загальний керівник</option>
                    <option value="2">інженерна підготовка</option>
                    <option value="3">психологічна підготовка</option>
                    <option value="4">розвідувальна підготовка</option>
                    <option value="5">військова топографія</option>
                    <option value="6">підготовка зі зв'язку</option>
                    <option value="7">РХБ захист</option>
                    <option value="8">фельдшер</option>
                  </select>
                </div>
                <div className="col-6">
                  {/* Exercise chief */}
                  <ReactSelectInput
                    placeholder="керівник"
                    className="exercise-chief"
                    autoFocus={false}
                    options={exercise_chiefs}
                  />
                </div>
              </div>
            )
          })}

          <div className="row">
            <div className="col-12">
              {/* Add exercise */}
              <button className="btn btn-primary time-add d-block ml-auto"
                onClick={props.handleExerciseAdd}>+</button>
            </div>
            <div className="col-12">
              <p>Текст заміни</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}