import React from "react";
import Day from "../Day/Day.js";
import './Week.css';

class Week extends React.Component {
  render() {
    let days = [];
    let { date } = this.props;   
    const {
      month,
      selected,
      select,
    } = this.props;

    let isFirstWeek = date.clone().startOf("week").month() === month.month();

    let lastDayIndex = date.clone().endOf("week").month() === month.month() ? 
                  date.clone().endOf("week").day() :
                  date.clone().endOf("month").day();

    for (var i = date.day(); i <= lastDayIndex; i++) {
      let day = {
          name: date.format("dd").substring(0, 1),
          number: date.date(),
          isToday: date.isSame(new Date(), "day"),
          date: date
      };
      days.push(
        <Day key={date.date()} day={day} selected={selected} select={select}/>
      );

      date = date.clone().add(1, "day");
    }

    return (
      <div className={"calendar__row" + (isFirstWeek ? "" : " row-right")}>
        {days}
      </div>
    );
  }
}

export default Week;

