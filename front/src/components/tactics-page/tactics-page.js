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
    date_short: '',
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
    time: [
      ['08.00', '13.05']
    ],
    // exerciseChiefInput: '',
    date: {
      day: '',
      month: '',
      year: ''
    },
    dateStr: '',
    inputChiefsValue: '',
    inputChiefsObject: {},
    isPheldsher: true,
    isMainChief: true
  }

  handleSubmit = e => {
    e.preventDefault();
    return;

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
              dateStr={this.state.dateStr}
              date_short={this.state.date_short}
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
              handleTimeSelect={this.handleTimeSelect}
              handleTimeClear={this.handleTimeClear}
              handleTimeAdd={this.handleTimeAdd}
              handleTimeRemove={this.handleTimeRemove}
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

  componentDidMount() {
    this.setDate();
    document.addEventListener("keydown", (e) => {
      if (e.key === "f") {
        console.log(this.state);
      }
    })
  }

  // Set date like .08.11 
  setDate = () => {
    const d = new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    });
    const arr = d.split("/");
    let day = arr[1];
    let month = arr[0];
    let year = arr[2];

    const date_short = this.transformDateShort({ day, month, year });
    
    this.setState({ 
      date: {
        day,
        month, 
        year
      },
      date_short,
      dateStr: day + '.' + month + '.' + year
    }, this.generateDateExpanded);
  }

  transformDateShort = (date) => {
    const { day, month, year } = date;
    let date_short = '';
    if (month === "01" && day === "01") {
      return `.12.${year - 1}`;
    } else if (day === "01") {
      let temp = parseInt(month) - 1;
      if (temp.length === 1) {
        return `.0${temp}.${year}`;
      } else {
        return `.${temp}.${year}`;
      }
    } else {
      return `.${month}.${year}`;
    }
  }

  handleDateChange = (e) => {
    this.setState({ dateStr: e.target.value }, () => {
      const regex = /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.]\d\d$/;
      if (regex.test(this.state.dateStr)) {
        const dateArr = this.state.dateStr.split('.');
        const date = {
          day: dateArr[0],
          month: dateArr[1],
          year: dateArr[2]
        }
        const date_short = this.transformDateShort(date);
        this.setState({ date, date_short }, this.generateDateExpanded);
      }
    });
  }

  generateDateExpanded = () => {
    const { date } = this.state;
    const day = days[parseInt(date.day) - 1];
    const month = months[parseInt(date.month) - 1];
    const year = `20${date.year} року`;
    this.setState({
      date_expanded: `${day} ${month} ${year}`
    })    
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

  handleTimeChange = (e, index, pos) => {
    const time = this.state.time;
    time[index][pos] = e.target.value;
    this.setState({ time }, this.generateTimeExpanded);
  }

  handleTimeSelect = (option, index, pos) => {
    let time = JSON.parse(JSON.stringify(this.state.time));
    time[index][pos] = option.value;
    this.setState({ time }, this.generateTimeExpanded);
  }

  handleTimeClear = (index, pos) => {
    let time = JSON.parse(JSON.stringify(this.state.time));
    time[index][pos] = '';
    this.setState({ time }, this.generateTimeExpanded);
  }

  handleTimeAdd = () => {
    this.setState({
      time: this.state.time.concat([['','']])
    }, this.generateTimeExpanded);
  }

  handleTimeRemove = (index) => {
    if (this.state.time.length === 1) return;

    let time = JSON.parse(JSON.stringify(this.state.time));
    time.splice(index, 1);
    this.setState({ time }, this.generateTimeExpanded);
  }

  generateTimeExpanded = () => {
    const time = this.state.time;
    const timeExpandedArr = [];
    
    if (!time) {
      this.setState({ time_expanded: ''});
    }

    time.map((item, index) => {
      timeExpandedArr[index] = `з ${item[0]} до ${item[1]}`;
    });
    const time_expanded = timeExpandedArr.join(' та ');
    this.setState({ time_expanded });
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

  toggleMainChief = () => {
    this.setState(({ isMainChief }) => {
      return {
        isMainChief: !isMainChief
      }
    }, () => {
      if (this.state.isMainChief) {
        
      }
    });
  }

  togglePheldsher = () => {
    this.setState(({ isPheldsher }) => {
      return {
        isPheldsher: !isPheldsher
      }
    });
  }
}

export default TacticsPage;