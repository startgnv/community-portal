import React from 'react';
import styled from 'styled-components/macro';
import mapPin from '../assets/images/map-pin.svg';

const PinContainer = styled.svg`
  transform: translate(${({ height }) => `${-height / 2}px, ${-height / 2}px`});
`;

export const MapPin = ({ size = 10, active }) => (
  <img height={active ? size * 2 : size} src={mapPin} alt="pin" />
);

export default MapPin;
