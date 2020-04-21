import React from 'react';
import styled from 'styled-components/macro';
import StorageImg from '../UI/StorageImg';
import { storage } from '../../../firebase';
import { useDownloadURL } from 'react-firebase-hooks/storage';

const Container = styled.div`
  position: relative;
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
    width: ${({ mainImgSize }) => mainImgSize}px;
    height: ${({ mainImgSize }) => mainImgSize}px;
    bottom: -30px;
    left: 30px;
    border-radius: 6px;
    border: solid 3px white;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.15);
  }
`;

const HeaderInner = styled.div`
  position: relative;
  height: ${({ coverHeight }) => coverHeight}px;
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
`;

const Title = styled.h1`
  position: absolute;
  bottom: 10px;
  color: white;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
  padding-left: 30px;
`;

const HeaderContent = styled.div`
  background: white;
`;

const ContentInner = styled.div`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  padding: 10px 30px;
  box-sizing: border-box;
`;

export const Header = ({
  title = '',
  coverPath,
  logoPath,
  coverHeight = 200,
  mainImgSize = 120,
  children = false
}) => {
  const [coverURL] = useDownloadURL(coverPath ? storage.ref(coverPath) : '');
  return (
    <Container coverURL={coverURL} mainImgSize={mainImgSize}>
      <HeaderInner coverHeight={coverHeight}>
        {title && <Title mainImgSize={mainImgSize}>{title}</Title>}
      </HeaderInner>
      {children && (
        <HeaderContent>
          <ContentInner mainImgSize={mainImgSize}>{children}</ContentInner>
        </HeaderContent>
      )}
    </Container>
  );
};

export default Header;
