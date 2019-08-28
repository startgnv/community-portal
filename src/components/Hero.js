import React from 'react';
import styled from 'styled-components';
import heroBG from '../assets/images/hero-bg.jpg';

const heroSizes = {
  small: '200px',
  medium: '300px',
  large: '450px'
};

const HeroContainer = styled.div`
  display: flex;
  min-height: ${({ size }) => heroSizes[size]};
  align-items: center;
  justify-content: center;
  padding-top: 70px;
  background-image: url(${heroBG});
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

const Hero = ({ children, size = 'medium' }) => (
  <HeroContainer size={size}>
    <HeroContent>{children}</HeroContent>
  </HeroContainer>
);

export default Hero;
