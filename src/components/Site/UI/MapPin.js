import React from 'react';
import styled from 'styled-components/macro';
import Link from './Link';
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

export const MapPin = ({
  size = 36,
  active,
  linkTo = 'javascript:;',
  company
}) => {
  const [visible, setVisible] = React.useState(false);

  const img = (
    <PinImg
      size={size}
      active={active}
      src="/assets/images/map-pin2.svg"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      alt="pin"
    />
  );

  return (
    <PinContainer active={active}>
      {visible && company && (
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
