import React from 'react';
import axios from 'axios';
import ReactInputSelect from 'react-input-select';
import chiefs from '../../database/exercise_chiefs.json';
import './tactics-page.scss';

const mockData = [{
  name: 'testName1',
  displayValue: 'testValue1'
}, {
  name: 'testName2',
  displayValue: 'testValue2'
}, {
  name: 'testName3',
  displayValue: 'testValue3'
}, {
  name: 'testName4',
  displayValue: 'testValue4'
}, {
  name: 'testName5',
  displayValue: 'testValue5'
}, {
  name: 'testName6',
  displayValue: 'testValue6'
}, {
  name: 'testName7',
  displayValue: 'testValue7'
}, {
  name: 'testName8',
  displayValue: 'testValue8'
}, {
  name: 'testName9',
  displayValue: 'testValue9'
}]

class TacticsPage extends React.Component {

  state = {
    date: '.11.19',
    date_expanded: 'Восьмого листопада 2019 року',
    platoons_expanded: '1, 2 навчальних взводів',
    squadron: '1 навчальної роти',
    time: [
      {
        time: 'з 8.00 до 13.05',
        platoons_expanded: '',
        //helping state
        platoons: '1, 2'
      }
    ],
    exercises: [
      {
        exercise_name: 'загальним керівником занять',
        exercise_chief: 'тимчасово виконуючого обов’язки начальника циклової комісії загально-військових дисциплін старшого сержанта Яремчука В.М.;'
      },
      {
        exercise_name: 'керівником заняття з безпеки бою',
        exercise_chief: 'командира 4 навчального взводу 1 навчальної роти молодшого лейтенанта Нижника О.А.;'
      }
    ],

    // helping state
    platoons: '',
    exerciseChiefInput: ''
  }

  componentDidMount() {
    this.setDate();
  }

  // Set date like .08.11 
  setDate = () => {
    const d = new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    });
    const arr = d.split("/");
    const day = arr[1];
    let month = arr[0];
    let year = arr[2];
    if (day === "01") {
      month = parseInt(month);
      if (month !== 1) {
        month--;
        if (month.length === 1) {
          month = '0' + month;
        }
      } else {
        month = "12";
        year = parseInt(year) - 1;
      }
    }
    const date = '.' + month + '.' + year;
    this.setState({ date });
  }

  // Set expanded wordly date like "Восьмого листопада 2019 року"
  setDateExpanded = () => {
    const day = new Date().getDate();
    let str = '';
    const dayArr = [
      "Першого",
      "Другого",
      "Третього",
      "Четвертого",
      "П'ятого",
      "Шостого",
      "Сьомого",
      "Восьмого",
      "Дев'ятого",
      "Десятого",
      "Одинадцятого",
      "Дванадцятого",
    ];
    switch (day) {
      case 1:
        str = "Першого";
        break;
      case 8:
        console.log("case 8");
        break;
      case 9:
        console.log("case 9");
        break;
      default:
        console.log("default");
    }
  }

  handleDateChange = (e) => {
    this.setState({ date: e.target.value });
  }

  handleDateExpandedChange = (e) => {
    this.setState({ date_expanded: e.target.value });
  }

  handleSquadronChange = (e) => {
    this.setState({ squadron: e.target.value + " навчальної роти" });
  }

  handlePlatoonsChange = (e) => {
    if (e.target.value.trim() === "") {
      this.setState({
        platoons: "",
        platoons_expanded: ""
      });
      return;
    }

    this.setState({ platoons: e.target.value });

    if (e.target.value.indexOf(",") !== -1 || e.target.value.indexOf("-") !== -1) {
      this.setState({ platoons_expanded: e.target.value + " навчальних взводів" });
    } else {
      this.setState({ platoons_expanded: e.target.value + " навчального взводу" });
    }
  }

  handleTimeAdd = () => {
    this.setState({
      time: this.state.time.concat([{ time: "", platoons: this.state.platoons_short }])
    });
  }

  handleExerciseChiefChange = (e) => {

  }

  customFilterFunction = (data, filterValue) => {
    if (!data || (data && data.length === 0)) {
      return null
    }

    if (filterValue.toString().trim().length === 0) {
      return data
    }

    return data
      .map((city) => {
        if (city.toString().toLowerCase().includes(filterValue.toLowerCase())) {
          return city
        }
      })
      .filter((city) => city)
      .sort((cityA, cityB) => {
        let aIndex = cityA.toString().toLowerCase().indexOf(filterValue.toLowerCase())
        let bIndex = cityB.toString().toLowerCase().indexOf(filterValue.toLowerCase())

        if (aIndex > bIndex) {
          return 1
        } else if (aIndex < bIndex) {
          return -1
        }

        return 0
      })
  }

  handleOnChange = (e) => {
    this.setState({ exerciseChiefInput: e.target.value })
  }

  handleOnBlur = (e) => {
    this.setState({ exerciseChiefInput: e.target.value })
  }

  handleOptionClick = (item, arr, e) => {
    this.setState({ exerciseChiefInput: item })
  }

  handleSubmit = e => {
    e.preventDefault();
    
    const data = this.state;

    axios.post(`http://localhost:8080/api/tactics`, data)
      .then(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  render() {
    const data = mockData
    const displayAll = false
    const isObject = false

    return (
      <div className="tactics-page">
        <div className="container">
          <form action="#" autoComplete="off" className="tactics-form"
            onSubmit={this.handleSubmit}>
            <h2>Наказ на тактику</h2>
            {/* Squadron */}
            <div className="form-group row">
              <label htmlFor="squadron" className="col-sm-2 col-form-label">Виберіть роту:</label>
              <div className="col-sm-4">
                <select className="custom-select"
                  onChange={this.handleSquadronChange}
                  defaultValue="1" id="squadron">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="col-sm-6">
                <span>{this.state.squadron}</span>
              </div>
            </div>
            {/* Platoons */}
            <div className="form-group row">
              <label htmlFor="platoons" className="col-sm-2 col-form-label">Укажіть взвод(и):</label>
              <div className="col-sm-4">
                <input id="platoons" type="text"
                  value={this.state.platoons}
                  onChange={this.handlePlatoonsChange}
                  className="form-control" />
                <small className="form-text text-muted">(Напр.: 0 або "" - всі взводи; 1,3 - перелік; 1-3 - проміжок)</small>
              </div>
              <div className="col-sm-6">
                <span>{this.state.platoons_expanded}</span>
              </div>
            </div>
            {/* Date short */}
            <div className="form-group row">
              <label htmlFor="date" className="col-sm-2 col-form-label">Дата наказу:</label>
              <div className="col-sm-4">
                <input id="date" type="text" className="form-control"
                  value={this.state.date}
                  onChange={this.handleDateChange}
                  placeholder=".11.19" />
              </div>
              <div className="col-sm-6">
                <span>{this.state.date}</span>
              </div>
            </div>
            {/* Date expanded */}
            <div className="form-group row">
              <label htmlFor="date_expanded" className="col-sm-2 col-form-label">Дата словами:</label>
              <div className="col-sm-4">
                <input id="date_expanded" type="text" className="form-control"
                  value={this.state.date_expanded}
                  onChange={this.handleDateExpandedChange}
                  placeholder="Восьмого листопада 2019 року" />
              </div>
              <div className="col-sm-6">
                <span>{this.state.date_expanded}</span>
              </div>
            </div>
            {/* Time */}
            <div className="form-group row">
              <label htmlFor="time" className="col-sm-2 col-form-label">Час проведення:</label>
              <div className="col-sm-4">
                <div className="row mb-1">
                  <div className="col-6">
                    <select className="custom-select"
                      onChange={this.handleTimeChange}
                      defaultValue="1" id="time">
                      <option value="1">з 8.00 до 13.05</option>
                      <option value="2">з 17.00 до 22.00</option>
                    </select>
                    {/* <input type="text" className="form-control" placeholder="з 8.00 до 13.05" /> */}
                  </div>
                  <div className="col-6">
                    <input type="text" className="form-control" placeholder="взвода" />
                  </div>
                </div>
                <button className="btn btn-primary time-add d-block ml-auto"
                  onClick={this.handleTimeAdd}>+</button>
              </div>
              <div className="col-sm-6">
                Текст заміни
            </div>
            </div>
            {/* Exercises */}
            <div className="form-group row">
              <label htmlFor="time" className="col-sm-2 col-form-label">Заняття:</label>
              <div className="col-sm-10">
                <div className="row mb-1">
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
                      {/* <input type="text" className="form-control" placeholder="керівник"
                        onChange={this.handleExerciseChiefChange} /> */}
                    
                    <ReactInputSelect
                      containerClass='chiefInputContainer'
                      containerId='containerIdTest'
                      data={data}
                      dataFilter={this.customFilterFunction}
                      displayAll = {displayAll}
                      dropdownId = 'dropdownIdTest'
                      dropdownOptionId = 'dropdownOptionIdTest'
                      dropdownOptionClass = 'form-control'
                      onChange = {this.handleOnChange}
                      onBlur = {this.handleOnBlur}
                      onOptionClick = {this.handleOptionClick}
                      inputClass = 'form-control'
                      inputId = 'inputIdTest'
                      isObject = {isObject}
                      value={this.state.exerciseChiefInput}
                    />

                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {/* Add exercise */}
                    <button className="btn btn-primary time-add d-block ml-auto">+</button>
                  </div>
                  <div className="col-12">
                    Текст заміни
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Згенерувати</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default TacticsPage;