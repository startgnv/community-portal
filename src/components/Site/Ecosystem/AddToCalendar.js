import calendarIcon from '../../../assets/images/calendar.svg';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const CalendarButton = styled.a`
  grid-area: calendar;
  border-radius: 100px;
  border: none;
  background-color: #4285f4;

  font-family: Ariel, sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: white;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;

  img {
    margin-right: 7px;
  }
`;

const AddToCalendar = ({ date, location, name }) => {
  if (!date || !location) return null;

  const startDate = moment.utc(date); //.add(16, 'hours') // This is done since Google Calender only understand UTC time, not EST
  const endDate = moment
    .utc(date)
    .utc()
    .add(1, 'hour');

  const url = `https://calendar.google.com/calendar/r/eventedit?dates=${startDate.format(
    'YYYY'
  )}${startDate.format('MM')}${startDate.format('DD')}T${startDate.format(
    'HH'
  )}${startDate.format('mm')}00Z/${endDate.format('YYYY')}${endDate.format(
    'MM'
  )}${endDate.format('DD')}T${endDate.format('HH')}${endDate.format(
    'mm'
  )}00Z&location=${location.split(' ').join('+')}&text=${name
    .split(' ')
    .join('+')}`;

  return (
    <CalendarButton href={url} target="_blank" rel="noreferrer noopener">
      <img src={calendarIcon} alt="Google Calendar" />
      SAVE
    </CalendarButton>
  );
};

export default AddToCalendar;

// https://calendar.google.com/calendar/r/eventedit?dates=20200716T020115Z/20200716T040115Z&location=NYC&text=Super+Fun+Event&details=Description+of+event.+Going+to+have+a+lot+of+fun+doing+things+that+we+scheduled+ahead+of+time.
