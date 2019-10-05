import React from 'react';
import styled from 'styled-components/macro';
import mapPin from '../assets/images/map-pin.svg';
import { Link } from 'react-router-dom';

const PinContainer = styled.div`
  z-index: ${({ active }) => (active ? '1000' : '100')};
`;

export const MapPin = ({ size = 36, active, linkTo }) => {
  const calcSize = active ? size * 2 : size;
  const img = <img height={calcSize} src={mapPin} alt="pin" />;
  let content;
  if (linkTo) {
    content = <Link to={linkTo}>{img}</Link>;
  } else {
    content = img;
  }
  return (
    <PinContainer height={calcSize} active={active}>
      {content}
    </PinContainer>
  );
};

export default MapPin;
