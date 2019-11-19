import React from 'react';
import axios from 'axios';
import days from '../../database/days.json';
import months from '../../database/months.json';
import './tactics-page.scss';
import {
  Squadron,
  Platoons,
  DateShort,
  DateExpanded,
  Time,
  Exercises
} from './parts';

class TacticsPage extends React.Component {
  state = {
    date: '.11.19',
    date_expanded: 'Восьмого листопада 2019 року',
    platoons_expanded: '',
    squadron: '1 навчальної роти',
    // Час проведення заняття з 08.00 до 13.05 та з 20.00 до 24.00.
    time_expanded: 'з 08.00 до 13.05',
    exercises: [
      {
        exercise_name: 'загальним керівником занять',
        exercise_chief: 'тимчасово виконуючого обов’язки начальника циклової комісії загально-військових дисциплін старшого сержанта Яремчука В.М.;'
      }
    ],

    // helping state
    platoons: '',
    time: ['з 08.00 до 13.05'],
    // exerciseChiefInput: '',
    inputChiefsValue: '',
    inputChiefsObject: {},
    isPheldsher: true,
    isMainChief: true
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

  handleTimeChange = (e) => {
    console.log("Time change feature isn't developed");
  }

  handleTimeAdd = () => {
    this.setState({
      time: this.state.time.concat(['з 17.00 до 22.00'])
    }, () => {
      this.setState({
        time_expanded: this.state.time.join(' та ')
      })
    });
  }

  handleExerciseAdd = () => {
    this.setState({
      exercises: this.state.exercises.concat([{
        exercise_name: '',
        exercise_chief: ''
      }])
    })
  }

  handleExerciseChiefChange = (e) => {
    this.setState({
      inputChiefsValue: e.target.value
    })
  }

  handleOnChange = (e) => {
    this.setState({ exerciseChiefInput: e.target.value })
  }

  handleOnBlur = (e) => {
    this.setState({ exerciseChiefInput: e.target.value })
  }

  handleChiefsOptionClick = (item, arr, e) => {
    this.setState({
      inputChiefsValue: item.name,

    });
  }

  togglePheldsher = () => {
    this.setState(({ isPheldsher }) => {
      return {
        isPheldsher: !isPheldsher
      }
    });
  }

  toggleMainChief = () => {
    this.setState(({ isMainChief }) => {
      return {
        isMainChief: !isMainChief
      }
    });
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
    return (
      <div className="tactics-page">
        <div className="container">
          <form action="#" autoComplete="off" className="tactics-form"
            onSubmit={this.handleSubmit}>
            <h2>Наказ на тактику</h2>
            {/* Squadron */}
            <Squadron
              squadron={this.state.squadron}
              handleSquadronChange={this.handleSquadronChange}
            />
            {/* Platoons */}
            <Platoons
              platoons={this.state.platoons}
              platoons_expanded={this.state.platoons_expanded}
              handlePlatoonsChange={this.handlePlatoonsChange}
            />
            {/* Date short */}
            <DateShort
              date={this.state.date}
              handleDateChange={this.handleDateChange}
            />
            {/* Date expanded */}
            <DateExpanded
              date_expanded={this.state.date_expanded}
              handleDateExpandedChange={this.handleDateExpandedChange}
            />
            {/* Time */}
            <Time
              time={this.state.time}
              time_expanded={this.state.time_expanded}
              handleTimeChange={this.handleTimeChange}
              handleTimeAdd={this.handleTimeAdd}
            />
            {/* Exercises */}
            <Exercises 
              isMainChief={this.state.isMainChief}
              toggleMainChief={this.toggleMainChief}
              isPheldsher={this.state.isPheldsher}
              togglePheldsher={this.togglePheldsher}
              isMainChief={this.state.isMainChief}
              exercises={this.state.exercises}
              handleExerciseAdd={this.handleExerciseAdd}
            />
            <button type="submit" className="btn btn-primary m-auto d-block">Згенерувати</button>
          </form>
        </div>
      </div>
    )
  }
}

export default TacticsPage;