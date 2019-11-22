import React, { Fragment } from 'react'
import exercise_names from '../../database/exercise_names.json';
import exercise_chiefs from '../../database/exercise_chiefs.json';
import ReactSelectInput from 'react-select-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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

export const DateShort = ({ dateStr, date_short, handleDateChange }) => {
  return (
    <div className="form-group row">
      <label htmlFor="date" className="col-sm-2 col-form-label">Дата наказу:</label>
      <div className="col-sm-5">
        <input id="date" type="text" className="form-control"
          value={dateStr}
          onChange={handleDateChange}
          placeholder="dd.mm.yy" />
      </div>
      <div className="col-sm-5">
        <span>{date_short}</span>
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
          placeholder="Восьмого листопада 2019 року" 
          readOnly  
        />
      </div>
      <div className="col-sm-5">
        <span>{date_expanded}</span>
      </div>
    </div>
  )
}

export const Time = ({ 
  time, 
  time_expanded, 
  handleTimeChange,
  handleTimeSelect,
  handleTimeClear, 
  handleTimeAdd, 
  handleTimeRemove
}) => {
  const hours = [
    { label: '8.00', value: '8.00' },
    { label: '13.05', value: '13.05' },
    { label: '18.00', value: '18.00' },
    { label: '20.00', value: '20.00' },
    { label: '21.00', value: '21.00' },
    { label: '22.00', value: '22.00' },
    { label: '24.00', value: '24.00' }
  ];

  return (
    <div className="form-group row">
      <label htmlFor="time" className="col-sm-2 col-form-label">Час проведення:</label>
      <div className="col-sm-5">
        {time.map((item, index) => (
          <div key={index} className="row mb-1 no-gutters">
            <div className="col-sm-11">
              <div className="row no-gutters">
                <div className="col-sm-6">
                  <ReactSelectInput
                    placeholder="початок"
                    className="time-select-input mr-2"
                    autoFocus={false}
                    value={item[0]}
                    options={hours}
                    onChange={(e) => handleTimeChange(e, index, 0)}
                    onSelect={(option) => handleTimeSelect(option, index, 0)}
                    onClear={() => handleTimeClear(index, 0)}
                  />
                </div>
                <div className="col-sm-6">
                  <ReactSelectInput
                    placeholder="кінець"
                    className="time-select-input"
                    autoFocus={false}
                    value={item[1]}
                    options={hours}
                    onChange={(e) => handleTimeChange(e, index, 1)}
                    onSelect={(option) => handleTimeSelect(option, index, 1)}
                    onClear={() => handleTimeClear(index, 1)}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-1 d-flex justify-content-end align-items-center">
              <FontAwesomeIcon 
                onClick={() => handleTimeRemove(index)}
                icon={faTrash}
                style={{opacity: time.length === 1 ? ".6" : "1"}}
              />
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-primary time-add d-block ml-auto"
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
            <div className="col-9 d-flex flex-row">
              <div className="custom-control custom-checkbox mr-3">
                <input type="checkbox"
                  className="custom-control-input" id="mainChief"
                  checked={props.isMainChief}
                  onChange={props.toggleMainChief} />
                <label className="custom-control-label"
                  htmlFor="mainChief">Загальний керівник</label>
              </div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox"
                  className="custom-control-input" id="medicalWorker"
                  checked={props.isPheldsher}
                  onChange={props.togglePheldsher} />
                <label className="custom-control-label"
                  htmlFor="medicalWorker">Черговий фельдшер</label>
              </div>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <span>Вдень</span>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <span>Вночі</span>
            </div>
            <div className="col-1">
              <button type="button" className="btn btn-primary time-add d-block ml-auto"
                onClick={props.handleExerciseAdd}>+</button>
            </div>
          </div>
          {props.exercises.map((item, index) => {
            return (
              <div key={index} className="row mb-1 no-gutters flex-nowrap">
                <div className="col-4 mr-2">
                  {/* { console.log(item, index) } */}
                  {/* Exercise name */}
                  <ReactSelectInput
                    placeholder="назва заняття"
                    className="exercise-chief"
                    autoFocus={false}
                    value={item.name}
                    options={exercise_names}
                    onChange={(e) => props.handleExerciseChange(e, index, 'name')}
                    onSelect={(option) => props.handleExerciseSelect(option, index, 'name')}
                    onClear={() => props.handleExerciseClear(index, 'name')}
                  />
                </div>
                <div className="col-5 mr-2">
                  {/* Exercise chief */}
                  <ReactSelectInput
                    placeholder="керівник"
                    className="exercise-chief"
                    autoFocus={false}
                    value={item.chief}
                    options={exercise_chiefs}
                    onChange={(e) => props.handleExerciseChange(e, index, 'chief')}
                    onSelect={(option) => props.handleExerciseSelect(option, index, 'chief')}
                    onClear={() => props.handleExerciseClear(index, 'chief')}
                  />
                </div>
                <div className="col-1 mr-2 d-flex justify-content-center">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox"
                      className="custom-control-input"
                      id={`exerciseDay${index}`}
                      checked={item.isDay}
                      onChange={() => props.toggleExerciseDayNight(index, 'isDay')} />
                    <label className="custom-control-label"
                      htmlFor={`exerciseDay${index}`}></label>
                    </div>
                </div>
                <div className="col-1 mr-2 d-flex justify-content-center">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox"
                      className="custom-control-input"
                      id={`exerciseNight${index}`}
                      checked={item.isNight}
                      onChange={() => props.toggleExerciseDayNight(index, 'isNight')} />
                    <label className="custom-control-label"
                      htmlFor={`exerciseNight${index}`}></label>
                  </div>
                </div>
                <div className="col-1 d-flex justify-content-start align-items-center">
                  <FontAwesomeIcon 
                    onClick={() => props.handleExerciseRemove(index)}
                    icon={faTrash}
                    style={{opacity: props.exercises.length === 1 ? ".6" : "1"}}
                  />
                </div>
              </div>
            )
          })}

          <div className="row mt-3">
            <div className="col-12">
              {/* <p>Текст заміни</p> */}
              {props.exercises_generated.map((item, index) => (
                <p key={index} className="mb-1">
                  { item }
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}