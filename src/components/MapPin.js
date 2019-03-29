import React from 'react';
import styled from 'styled-components/macro';

const PinContainer = styled.svg`
  transform: translate(${({ height }) => `${-height / 2}px, ${-height / 2}px`});
`;

export const MapPin = ({ size = 10, active }) => (
  <PinContainer height={active ? size * 2 : size} viewBox="0 0 24 24">
    <circle
      fill={active ? 'blue' : 'black'}
      r={active ? size : size / 2}
      cx={active ? size : size / 2}
      cy={active ? size : size / 2}
    />
  </PinContainer>
);

export default MapPin;
