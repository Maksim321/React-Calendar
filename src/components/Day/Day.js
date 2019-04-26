import React from "react";
import moment from "moment";
import {Events} from "../../events.js"
import './Day.css';

class Day extends React.Component {

  isHaveEvents(date){
    return Events.findIndex((event)=>{
      return moment(event.date, 'DD.MM.YYYY').format('DD-MM-YYYY') === date.format('DD-MM-YYYY');
    });    
  }

  render() {
    const {
      day, day: {
        date,
        isToday,
        number
      },
      select,
      selected
    } = this.props;

    return (
      <div className={ 
            "calendar__cell" + 
            (isToday ? " today" : "") + 
            (date.isSame(selected) ? " selected" : "" + 
            (date.isoWeekday()<6 ? "" : " dayoff"))
          } 
        onClick={()=>select(day)}> 
        <span className={"day_number" + (this.isHaveEvents(date)>=0 ? " events_indicator" : "")}>{number}</span>
      </div>
    );
  }
}

export default Day;