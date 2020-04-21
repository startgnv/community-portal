import React from 'react';
import styled from 'styled-components/macro';
import _ from 'lodash';
import { rgba } from 'polished';

const GalleryContainer = styled.div``;

const SubHeader = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  color: ${({ theme }) => theme.textDark};
  letter-spacing: 1px;
  text-align: center;
  margin-top: 35px;
`;

const ImgsContainer = styled.div`
  margin: 25px 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.contentMaxWidth};
`;

const ImgContainer = styled.div`
  width: 31%;
  height: 225px;
  overflow: hidden;
  border-radius: 3px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Control = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  color: ${({ theme, disabled }) =>
    disabled ? rgba(theme.textDark, 0.5) : theme.textDark};
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  padding: 10px;

  &:hover {
    background: ${({ theme, disabled }) =>
      disabled ? 'none' : rgba(theme.textDark, 0.05)};
  }
`;

const CounterContainer = styled.div`
  display: flex;
`;

const Counter = styled.div`
  width: 15px;
  height: 15px;
  margin: 0 4px;
  border-radius: 100px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.deepNavy : rgba(theme.deepNavy, 0.25)};
  cursor: pointer;
`;

export const Gallery = ({ photoURLs }) => {
  const pages = _.chunk(photoURLs, 3);
  const [page, setPage] = React.useState(0);

  if (pages.length < 1) return <></>;

  return (
    <GalleryContainer>
      <SubHeader>PHOTO GALLERY</SubHeader>

      <ImgsContainer>
        <>
          <ImgContainer>
            {pages[page][0] && <img src={pages[page][0]} alt="Company Image" />}
          </ImgContainer>
          <ImgContainer>
            {pages[page][1] && <img src={pages[page][1]} alt="Company Image" />}
          </ImgContainer>
          <ImgContainer>
            {pages[page][2] && <img src={pages[page][2]} alt="Company Image" />}
          </ImgContainer>
        </>
      </ImgsContainer>

      <ControlsContainer>
        <Control disabled={page < 1} onClick={() => setPage(page - 1)}>
          PREV
        </Control>
        {pages.length > 1 && (
          <CounterContainer>
            {pages.map((_, i) => (
              <Counter selected={i === page} onClick={() => setPage(i)} />
            ))}
          </CounterContainer>
        )}
        <Control
          disabled={page === pages.length - 1}
          onClick={() => setPage(page + 1)}
        >
          NEXT
        </Control>
      </ControlsContainer>
    </GalleryContainer>
  );
};
