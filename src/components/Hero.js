import React from 'react';
import styled from 'styled-components';
import heroBG from '../assets/images/hero-bg.jpg';

const heroSizes = {
  small: '120px',
  medium: '200px',
  large: '300px'
};

const HeroContainer = styled.div`
  background-image: url(${heroBG});
  background-size: cover;
  background-position: center;
`;

const HeroContent = styled.div`
  position: relative;
  display: flex;
  width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  min-height: ${({ size }) => {
    console.warn(size, heroSizes);
    return heroSizes[size];
  }};
`;

const HeroTitle = styled.h2`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 20px;
  background-color: white;
  line-height: 64px;
  font-size: 46px;
  color: ${({ theme }) => theme.textDark};
`;

const Hero = ({ children, size = 'medium', bgImage = '', title = '' }) => (
  <HeroContainer bgImage={bgImage}>
    <HeroContent size={size}>
      <HeroTitle>{title}</HeroTitle>
    </HeroContent>
  </HeroContainer>
);

export default Hero;
