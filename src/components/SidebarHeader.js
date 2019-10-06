import React from 'react';
import styled from 'styled-components/macro';
import StorageImg from './StorageImg';
import { storage } from '../firebase';
import { useDownloadURL } from 'react-firebase-hooks/storage';

const SidebarHeaderContainer = styled.div`
  position: relative;
  height: ${({ height }) => height};
  background-image: url(${props => props.coverURL});
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

const HeaderInner = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.contentMaxWidth};
  height: 100%;
  margin: 0 auto;
`;

export const SidebarHeader = ({
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
        <StorageImg className="logo" path={logoPath} alt="Logo" />
      </HeaderInner>
    </SidebarHeaderContainer>
  );
};

export default SidebarHeader;
