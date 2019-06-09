import React from 'react';
import styled from 'styled-components/macro';
import mapPin from '../assets/images/map-pin.svg';
import { Link } from 'react-router-dom';

const PinContainer = styled.div`
  transform: translate(${({ height }) => `${-height * 0.75}px, ${-height}px`});
`;

export const MapPin = ({ size = 36, active, linkTo }) => {
  const img = <img height={active ? size * 2 : size} src={mapPin} alt="pin" />;
  let content;
  if (linkTo) {
    content = <Link to={linkTo}>{img}</Link>;
  } else {
    content = img;
  }
  return <PinContainer height={size}>{content}</PinContainer>;
};

export default MapPin;
