import React from 'react';
import styled from 'styled-components';
import heroBG from '../assets/images/hero-bg.jpg';

const heroSizes = {
  small: '200px',
  medium: '300px',
  large: '420px'
};

const HeroContainer = styled.div`
  display: flex;
  min-height: ${({ size }) => heroSizes[size]};
  align-items: center;
  justify-content: center;
  margin-top: -${({ theme }) => theme.headerHeight};
  background-image: url(${({ bgImage }) => bgImage || heroBG});
  background-size: cover;
  background-position: center;
  background-repeat: none;
`;

const HeroContent = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Hero = ({ children, size = 'medium', bgImage = '' }) => (
  <HeroContainer size={size} bgImage={bgImage}>
    <HeroContent>{children}</HeroContent>
  </HeroContainer>
);

export default Hero;
