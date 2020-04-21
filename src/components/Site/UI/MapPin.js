import React from 'react';
import styled from 'styled-components/macro';
import mapPin from '../../../assets/images/map-pin2.svg';
import { Link } from 'react-router-dom';
import CompanyListItem from '../Home/CompanyListItem';

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

const PopupContainer = styled.div`
  position: absolute;
  min-width: 200px;
  z-index: 1000000;
`;

export const MapPin = ({ size = 36, active, linkTo, company }) => {
  const [visible, setVisible] = React.useState(false);

  const img = (
    <PinImg
      size={size}
      active={active}
      src={mapPin}
      onMouseEnter={() => setVisible(true)}
      alt="pin"
    />
  );

  return (
    <PinContainer active={active}>
      {visible && (
        <PopupContainer onMouseLeave={() => setVisible(false)}>
          <CompanyListItem company={company} />
        </PopupContainer>
      )}
      <Link to={linkTo} onMouseLeave={() => setVisible(false)}>
        {img}
      </Link>
    </PinContainer>
  );
};

export default MapPin;
