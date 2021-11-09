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

const EventCalendar = props => (
  <div>
      <Calendar
      style={{height: '420px'}}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      events={props.eventList}
      />
  </div>
)


const CalendarView = () => {
  const [allEvents, setEvents] = useState([])
  useEffect(()=>{
    if(!allEvents.length) getEvents(async(events) => {
      setEvents([...allEvents, ...events])
    })
  })
  useEffect(()=>{
    console.log(allEvents) 
  },[allEvents])

  return(
    <EventCalendar eventList={allEvents}/>
  )
}

export default CalendarView




  




