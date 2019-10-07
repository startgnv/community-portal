import React from 'react';
import styled from 'styled-components/macro';
import StorageImg from './StorageImg';
import { storage } from '../firebase';
import { useDownloadURL } from 'react-firebase-hooks/storage';

const SidebarHeaderContainer = styled.div`
  position: relative;
  height: ${({ height }) => height};
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(255, 255, 255, 0) 50%
    ),
    url(${props => props.coverURL});
  background-size: cover;
  background-position: center;

  .logo {
    position: absolute;
    width: ${({ mainImgSize }) => mainImgSize};
    height: ${({ mainImgSize }) => mainImgSize};
    bottom: -30px;
    left: 30px;
    border-radius: 6px;
    border: solid 3px white;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h1`
  position: absolute;
  left: 170px;
  bottom: 10px;
  color: white;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
`;

const HeaderInner = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.contentMaxWidth};
  height: 100%;
  margin: 0 auto;
`;

export const SidebarHeader = ({
  title = '',
  coverPath,
  logoPath,
  height = '200px',
  mainImgSize = '120px'
}) => {
  const [coverURL] = useDownloadURL(coverPath ? storage.ref(coverPath) : '');
  return (
    <SidebarHeaderContainer
      coverURL={coverURL}
      height={height}
      mainImgSize={mainImgSize}
    >
      <HeaderInner>
        {title && <Title>{title}</Title>}
        <StorageImg className="logo" path={logoPath} alt="Logo" />
      </HeaderInner>
    </SidebarHeaderContainer>
  );
};

export default SidebarHeader;
