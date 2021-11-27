import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { getEvents } from './gcal'

import { Calendar, momentLocalizer} from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

// Add padding to the calendar and altering the colors and font to match the rest of the site.
const eventStyleGetter = (event, start, end, isSelected) =>{
  let style = {
      backgroundColor: '#f35b1a',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
      fontSize: '12px',
      fontFamily: 'Arial,sans-serif',
      fontWeight: 'bold'
  };
  return {
      style: style
  };
}

const calendarStyle = {
  height: '800px',
  padding: ' 0.5rem 0',
}

// const ColoredDateCellWrapper = ({ children }) =>
//   React.cloneElement(React.Children.only(children), {
//     style: {
//       color: 'red',
//     },
//   })


const localizer = momentLocalizer(moment)

const EventCalendar = props => {
  let {eventList} = props;

  eventList = eventList.map(event => ({
    ...event,
    start: new Date(JSON.parse(event.start)),
    end: new Date(JSON.parse(event.end))
  }));

  return(
    <div>
        <Calendar
        style={calendarStyle}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={eventList}
        eventPropGetter={eventStyleGetter}
        />
    </div>
  )
}


const CalendarView = ({initialEvents}) => {
  // const [allEvents, setEvents] = useState(initialEvents ? initialEvents : []);
  // useEffect(()=>{
  //   if(!allEvents.length) getEvents(async(events) => {
  //     if(events?.length)
  //       setEvents([...allEvents, ...events])
  //   })
  // })
  // useEffect(()=>{
  //   console.log(process.env) 
  // },[allEvents])

  return(
    <EventCalendar eventList={initialEvents || []}/>
  )
}

export async function getStaticProps(){
  let initialEvents;
   await getEvents(async(val) => {
     initialEvents = val;
  })
  return {
    props: { initialEvents },
    revalidate: 1
  }
}

export default CalendarView




  




