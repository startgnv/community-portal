import React from 'react';
import styled from 'styled-components/macro';
import mapPin from '../assets/images/map-pin2.svg';
import { Link } from 'react-router-dom';

const PinContainer = styled.div`
  z-index: ${({ active }) => (active ? '1000' : '100')};
`;

const PinImg = styled.img`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  transform: translateX(-${({ size }) => size / 2}px)
    translateY(-${({ size }) => size}px)
    scale(${({ active }) => (active ? 2 : 1)});
  transform-origin: bottom center;
  transition: 150ms;
`;

export const MapPin = ({ size = 36, active, linkTo }) => {
  const img = <PinImg size={size} active={active} src={mapPin} alt="pin" />;
  let content;
  if (linkTo) {
    content = <Link to={linkTo}>{img}</Link>;
  } else {
    content = img;
  }
  return <PinContainer active={active}>{content}</PinContainer>;
};

export default MapPin;
