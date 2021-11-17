import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { getEvents } from './gcal'

import { Calendar, dateFnsLocalizer} from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const EventCalendar = props => {
  let {eventList} = props;

  eventList = eventList.map(event => ({
    ...event,
    start: JSON.parse(event.start),
    end: JSON.parse(event.end)
  }));

  return(
    <div>
        <Calendar
        style={{height: '420px'}}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={eventList}
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




  




