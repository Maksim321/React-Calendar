import React from "react";
import './CardEvent.css';

class CardEvent extends React.Component {
  render() {

    let { events } = this.props;
    let cards = [];

    return events.map((event, index)=>{
      return(
        <div key={index} className="event-block">
          <div className="event__header">
            <div className="event__title">{event.name}</div>
            <div className="event__time">{event.time}</div>
          </div>
          <div className="event__body">
            {event.body}
          </div>
        </div>
      )
    });
  }
}

export default CardEvent;

