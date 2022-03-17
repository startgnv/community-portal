import React from 'react';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEvents } from '../../src/components/Site/Calendar/gcal';
import styled from 'styled-components/macro';
import { Calendar, momentLocalizer} from 'react-big-calendar';

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
  // width: '60vw',
  margin: '20px',
}

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

const CalendarContainer = styled.div`
  /* display: flex; */
`;
const SideBarContainer = styled.ul`
flex-grow: 1;
  width: auto;
  height: 100%;
`;

const Sidebar = ({initialEvents}) => {
  console.log(initialEvents);
 return( 
   <SideBarContainer>

   </SideBarContainer>
 )
}


const CalendarView = ({initialEvents}) => {
  return(
    <CalendarContainer>
      <EventCalendar eventList={initialEvents || []}/>
      {/* <Sidebar eventList={initialEvents || []}/> */}
    </CalendarContainer>
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




  




