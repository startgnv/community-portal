import React from 'react';
import styled from 'styled-components';
import { baseContentStyling } from '../../utils/mixins';
import { Parser } from 'html-to-react';
import moment from 'moment';
import defaultThumbnail from '../../../assets/images/ecosystem-default-thumbnail.png';
import AddToCalendar from './AddToCalendar';

const html = new Parser();

const EcoItem = styled.div`
  border-radius: 3px;
  background: white;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.08);
  overflow: hidden;

  position: relative;
`;

const EcoItemImg = styled.div`
  background-image: url(${props => props.src});
  height: 120px;
  background-size: cover;
  position: relative;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 15px;
`;

const EcoItemTime = styled.h3`
  padding: 5px 7px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.35);

  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: white;

  margin-bottom: 12px;
  z-index: 1;
`;

const EcoItemDate = styled.h3`
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: white;
  z-index: 10;
`;

const ImgGradient = styled.div`
  width: 100%;
  height: 80px;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(19, 21, 22, 0.9) 100%
  );
  position: absolute;
  bottom: 0;
  left: 0;
`;

const EcoItemContent = styled.div`
  padding: 16px 16px 0 16px;
`;

const EcoItemHead = styled.div`
  margin-bottom: 10px;

  display: grid;
  grid-template-areas:
    'header calendar'
    'subheader calendar';

  grid-template-columns: 4fr 1fr;
`;

const EcoItemHeader = styled.a`
  grid-area: header;
  font-family: WilliamsCaslonText, serif;
  font-size: 18px;
  color: ${props => props.theme.textDark};
  width: 75%;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const EcoItemSubheader = styled.h4`
  grid-area: subheader;
  font-family: Montserrat, sans-serif;
  font-size: 12px;
  color: ${props => props.theme.textDark};
  opacity: 0.7;
`;

const EcoItemDescription = styled.div`
  ${baseContentStyling()}

  p {
    color: ${props => props.theme.textDark};
    opacity: 0.7;
    line-height: 22px;
  }
`;

const EcosystemCard = ({
  name,
  thumbnail,
  location,
  description,
  eventDate,
  link
}) => {
  const time = eventDate ? moment(eventDate).format('h:mm A') : null;
  const date = eventDate ? moment(eventDate).format('dddd [/] D MMMM') : null;

  return (
    <EcoItem key={name}>
      <EcoItemImg src={thumbnail ? thumbnail : defaultThumbnail}>
        {time && <EcoItemTime>{time}</EcoItemTime>}
        {date && <EcoItemDate>{date}</EcoItemDate>}
        <ImgGradient />
      </EcoItemImg>
      <EcoItemContent>
        <EcoItemHead>
          <EcoItemHeader href={link}>{name}</EcoItemHeader>
          {location && <EcoItemSubheader>{location}</EcoItemSubheader>}
          <div style={{ gridArea: 'calendar' }}>
            <AddToCalendar date={eventDate} location={location} name={name} />
          </div>
        </EcoItemHead>
        <EcoItemDescription>{html.parse(description)}</EcoItemDescription>
      </EcoItemContent>
    </EcoItem>
  );
};

export default EcosystemCard;
