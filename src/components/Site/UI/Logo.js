import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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

const logoDark = '/assets/images/startgnv-logo.png';
const logoLight = '/assets/images/startgnv-logo-white.png';

const Logo = ({ variant }) => (
  <Container>
    <Link href="/">
      <a className="logo-link">
        <Img src={variant === 'light' ? logoLight : logoDark} alt="startGNV" />
      </a>
    </Link>
  </Container>
);

export default Logo;
