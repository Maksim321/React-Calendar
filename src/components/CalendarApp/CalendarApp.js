import React from "react";
import moment from "moment";
import Header from "../Header/Header.js";
import Week from "../Week/Week.js";
import CardEvent from "../CardEvent/CardEvent.js";
import {Events} from "../../events.js"

import './CalendarApp.css';

class CalendarApp extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      month: moment(),
      selectedDay: moment().startOf('day'),
      selector: false,
      modeWeek: false
    };
       
    this.switchMode = this.switchMode.bind(this);
    this.modeWeekOn = this.modeWeekOn.bind(this);
    this.modeWeekOff = this.modeWeekOff.bind(this);

    this.updateMonth = this.updateMonth.bind(this);
  }

  get month(){
    return this.state.month;
  } 

  get selectedDay(){
    return this.state.selectedDay;
  } 

  get cloneMonth(){
    return this.month.clone();
  } 

  get eventsMonth(){
  	return Events.filter(event =>
      moment(event.date, 'DD.MM.YYYY').year() == this.selectedDay.year() && 
  		moment(event.date, 'DD.MM.YYYY').month() == this.selectedDay.month() &&
  		moment(event.date, 'DD.MM.YYYY').date() >= this.selectedDay.date());
  }

  get eventsWeek(){
  	return Events.filter(event => 
      moment(event.date, 'DD.MM.YYYY').year() == this.selectedDay.year() &&
  		moment(event.date, 'DD.MM.YYYY').week() == this.selectedDay.week() &&
  		moment(event.date, 'DD.MM.YYYY').day() >= this.selectedDay.day());
  }   
  
  select(day) {
    this.setState({
      selectedDay: day.date,
      month: day.date.clone()
    });
  }

  switchMode(){
    this.setState({
      selector: !this.state.selector
    });
  }

  updateMonth(month){
    this.setState({
      month: month
    });    
  }

  modeWeekOn(){
    this.setState({
      modeWeek: true,
      selector: false
    });
  }

  modeWeekOff(){
    this.setState({
      modeWeek: false,
      selector: false
    });
  }

  renderWeek() {
    let date = this.cloneMonth.startOf("week").month() === this.month.month() ? 
               this.cloneMonth.startOf("week") :
               this.cloneMonth.startOf("month");

    return (<Week key={date.week()} 
          date={date.clone()} 
          month={this.month} 
          select={(day)=>this.select(day)} 
          selected={this.selectedDay} />);
  }

  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.cloneMonth.startOf("month");
    let monthIndex = date.month();

    while (!done) {
      weeks.push(
        <Week key={date.week()} 
          date={date.clone()} 
          month={this.month} 
          select={(day)=>this.select(day)} 
          selected={this.selectedDay} />
      );

      date.add(1, "w").startOf("week");
      
      done = monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }

  renderTemplateEvent(event) {
    let isSelectedDay = moment(event.date, 'DD.MM.YYYY').date() === this.selectedDay.date();
  	return (
  	  <div key={moment(event.date, 'DD.MM.YYYY').date()} className="events-card">
  	    <div className={"events-date " + (isSelectedDay ? " events-date_selected" : "")}>
  	      { moment(event.date, 'DD.MM.YYYY').format(isSelectedDay ? 'dddd, DD MMMM' : 'ddd, DD MMMM') }
  	    </div>
  	    <CardEvent events={event.events} />
  	  </div>
  	);    	
  }

  renderEvents() {
  	let events = this.state.modeWeek ? this.eventsWeek : this.eventsMonth;
    let eventsSort = events.sort((a,b) => 
    	(moment(a.date, 'DD.MM.YYYY').date() > moment(b.date, 'DD.MM.YYYY').date()) ? 1 : 
    	((moment(b.date, 'DD.MM.YYYY').date() > moment(a.date, 'DD.MM.YYYY').date()) ? -1 : 0)
    ); 
    return eventsSort.map((event)=>{
	  return (this.renderTemplateEvent(event));    	
    })
  }

  renderSelector() {
    return  (
      <section className="selector-container">
        <a className="selector__link" onClick={this.modeWeekOn}>This week</a>
        <a className="selector__link" onClick={this.modeWeekOff}>This month</a>
      </section>
    );
  }

  render() {
    return (
      <div className="calendar-container">
      	<header className="header__container">
          <Header month={this.state.month} 
                  updateMonth={this.updateMonth} 
                  modeWeek={this.state.modeWeek}
                  selector={this.state.selector}
                  switchMode={this.switchMode}/>
        </header>
        { this.state.selector ? this.renderSelector():"" }
        <section className="body__container">
          {this.state.modeWeek ? this.renderWeek() : this.renderWeeks()}
        </section>
        <section className="events__container">
          <div className="events-wrap">
            {this.renderEvents()}
          </div>
        </section>
        <footer className="footer__container">
      	</footer>
      </div>
    );
  }
}

export default CalendarApp;