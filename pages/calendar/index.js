// import React from 'react';
// import { ThemeProvider } from 'styled-components';
// import { ReactEmbeddedGoogleCalendar } from 'react-embedded-google-calendar';
// import styled from "styled-components";

// const CalendarWrapper = styled.div`
//     margin-right: auto;
//     margin-left: auto;

//     max-width: 960px;

//     padding-right: 10px;
//     padding-left: 10px;

// `;



// const theme = {
//     font: "Calibri",  
// }

// const CalendarView = () =>(
//     <ThemeProvider theme={theme}>
//         <CalendarWrapper>
//             <ReactEmbeddedGoogleCalendar publicUrl="https://calendar.google.com/calendar/embed?src=pemisin.toyo%40gmail.com&ctz=America%2FNew_York" height= '400px'/>
//         </CalendarWrapper>
//     </ThemeProvider> 
// );

// export default CalendarView ;


import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from 'date-fns/startOfWeek';
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const locales = {
    "en-US": require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events= [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2021, 8, 28),
        end: new Date(2021, 8, 28)
    },
    {
        title: "Vacation",
        start: new Date(2021, 8, 28),
        end: new Date(2021, 8, 30)
    },
    {
        title: "Conference",
        start: new Date(2021, 8, 28),
        end: new Date(2021, 8, 28)
    },
]

function CalendarView(){
  const [newevent, setNewEvent] = useState({title: "", start: "", end:""})
  const [allevents, setAllEvents] = useState(events)

  const handleAddEvent = () =>{
    setAllEvents([...events, newevent])
}

    return(
        <div className="App">
          <h1>Calendar</h1>
          <h2>Add new Event</h2>
          <div>
            <input type="text" placeholder="Add Title" style={{width: "20%", marginRight: "10px"}}
              value={newevent.title} onChange={(e)=> setNewEvent({...newevent, title: e.target.value})}
              />
              <DatePicker placeholderText="Start Date" style={{marginRight: "10px"}}
              selected={newevent.start} onChange={(start) => setNewEvent({...newevent, start: start})}/>
              <DatePicker placeholderText="End Date" style={{marginRight: "10px"}}
              selected={newevent.end} onChange={(end) => setNewEvent({...newevent, end: end})}/>
              <button style={{marginTop: "10px"}} onClick={handleAddEvent}>
                Add Event 
              </button>
          </div>

            <Calendar
                localizer={localizer}
                events={allevents}
                startAccessor="start"
                endAccessor="end"
                style={{height: 500, margin:"50px"}}
            />
        </div>
    );
}
export default CalendarView;
