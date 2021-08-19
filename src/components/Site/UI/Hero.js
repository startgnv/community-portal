import React from 'react';
import styled from 'styled-components/macro';

const heroSizes = {
  small: '120px',
  medium: '200px',
  large: '300px'
};

const HeroContainer = styled.div`
  background-image: url(${({ bgImage }) =>
    bgImage || '/assets/images/hero-bg.jpg'});
  background-size: cover;
  background-position: center;
`;

const HeroContent = styled.div`
  position: relative;
  display: flex;
  max-width: ${({ theme, maxWidth }) => maxWidth || theme.contentMaxWidth};
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  min-height: ${({ size }) => heroSizes[size]};
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

const Hero = ({
  children,
  size = 'medium',
  bgImage = '',
  title = '',
  maxWidth = ''
}) => (
  <HeroContainer bgImage="/assets/images/hero-bg.jpg">
    <HeroContent size={size} maxWidth={maxWidth}>
      <HeroTitle>{title}</HeroTitle>
    </HeroContent>
  </HeroContainer>
);

export default Hero;
