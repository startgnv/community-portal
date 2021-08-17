import React from 'react';
import styled from 'styled-components';
import logoDark from '../../../assets/images/startgnv-logo.png';
import logoLight from '../../../assets/images/startgnv-logo-white.png';

const Container = styled.div`
  display: block;
  text-decoration: none;
  width: 150px;

  .logo-link {
    display: block;
    text-decoration: none;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Logo = ({ variant }) => (
  <Container>
    {/* <Link className="logo-link" to="/">
      <Img src={variant === 'light' ? logoLight : logoDark} alt="startGNV" />
    </Link> */}
  </Container>
);

export default Logo;
