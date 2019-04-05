import React from 'react';
import styled from 'styled-components/macro';
import mapPin from '../assets/images/map-pin.svg';

const PinContainer = styled.div`
  transform: translate(${({ height }) => `${-height * 0.75}px, ${-height}px`});
`;

export const MapPin = ({ size = 36, active }) => (
  <PinContainer height={size}>
    <img height={active ? size * 2 : size} src={mapPin} alt="pin" />
  </PinContainer>
);

export default MapPin;
