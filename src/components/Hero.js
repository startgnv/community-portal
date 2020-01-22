import React from 'react';
import styled from 'styled-components';

const heroSizes = {
  small: '200px',
  medium: '300px',
  large: '420px'
};

const HeroContainer = styled.div``;

const HeroContent = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  min-height: ${({ size }) => heroSizes[size]};
`;

const Hero = ({ children, size = 'medium', bgImage = '' }) => (
  <HeroContainer size={size} bgImage={bgImage}>
    <HeroContent>{children}</HeroContent>
  </HeroContainer>
);

export default Hero;
