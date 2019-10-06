import React from 'react';
import styled from 'styled-components/macro';
import mapPin from '../assets/images/map-pin2.svg';
import { Link } from 'react-router-dom';

const PinContainer = styled.div`
  z-index: ${({ active }) => (active ? '1000' : '100')};
`;

const PinImg = styled.img`
  height: ${({ pinHeight }) => pinHeight}px;
  width: ${({ pinHeight }) => pinHeight}px;
  transform: translateX(-${({ pinHeight }) => pinHeight / 2}px)
    translateY(-${({ pinHeight }) => pinHeight}px);
  transition: 150ms;
`;

export const MapPin = ({ size = 36, active, linkTo }) => {
  const calcSize = active ? size * 2 : size;
  const img = <PinImg pinHeight={calcSize} src={mapPin} alt="pin" />;
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
