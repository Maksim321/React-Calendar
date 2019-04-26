import React from "react";
import moment from "moment";
import './Header.css';

class Header extends React.Component {

  constructor(props){
    super(props);

    this.prevMonth = this.previous.bind(this, 'month');
    this.nextMonth = this.next.bind(this, 'month');
    this.nextWeek = this.next.bind(this, 'week');
    this.prevWeek = this.previous.bind(this, 'week');
  }

  get month(){
    return this.props.month;
  }

  get cloneMonth(){
    return this.month.clone();
  }

  get modeWeek(){
    return this.props.modeWeek;
  }

  get switchMode(){
    return this.props.switchMode;
  } 

  get selector(){
    return this.props.selector;
  }
  
  previous(interval) {
    if(this.month.month() === this.cloneMonth.subtract(1, interval).endOf(interval).month()){
      this.props.updateMonth(this.month.subtract(1, interval).endOf('week'));
    } else {
      this.props.updateMonth(this.month.subtract(1, interval).endOf('month'));
    }
  }

  next(interval) {
    if(this.month.month() === this.cloneMonth.add(1, interval).startOf(interval).month()){
      this.props.updateMonth(this.month.add(1, interval).startOf('week'));
    } else {
      this.props.updateMonth(this.month.add(1, interval).startOf('month'));
    }
  } 

  renderWeekNum(){
    let first = this.month.month() === this.cloneMonth.startOf('week').month()?
                this.cloneMonth.startOf('week').date():
                this.cloneMonth.startOf('month').date();

    let last =  this.month.month() === this.cloneMonth.endOf('week').month()?
                this.cloneMonth.endOf('week').date():
                this.cloneMonth.endOf('month').date();

    if(first == last)
      return (` ${first}`);
    else
      return (` ${first}-${last}`);
  }

  renderDaysWeek() {
    return (
      <div className="header-week">
        <div className="header__day">S</div>
        <div className="header__day">M</div>
        <div className="header__day">T</div>
        <div className="header__day">W</div>
        <div className="header__day">T</div>
        <div className="header__day">F</div>
        <div className="header__day">S</div>
      </div>
    );
  }

  render() {
    return  (
      <div className="header__wrap">
        <div className="header-inputs">
          <div className="header-inputs_prev">
            {this.modeWeek ?
              <span className="next-label" onClick={this.prevWeek}>PREV</span> :
              <span className="prev-label" onClick={this.prevMonth}>{this.cloneMonth.subtract(1, "month").format("MMM")}</span>
            }
          </div>
          <div className={"header-inputs__label arrow" + (this.selector ? " arrow_up" : "")} 
               onClick={this.switchMode}>
            {this.month.format("MMMM") + (this.modeWeek ? this.renderWeekNum() : "")}
          </div>
          <div className="header-inputs_next">
            {this.modeWeek ?
              <span className="next-label" onClick={this.nextWeek}>NEXT</span> :              
              <span className="next-label" onClick={this.nextMonth}>{this.cloneMonth.add(1, "month").format("MMM")}</span> 
            }
          </div>
        </div>
        {this.renderDaysWeek()}
      </div>
    );
  }
}

export default Header;