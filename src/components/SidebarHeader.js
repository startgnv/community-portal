import React from 'react';
import styled from 'styled-components/macro';

const SidebarHeaderContainer = styled.div`
  position: relative;
  height: ${({ height }) => height};
  background-image: url(${props => props.coverImg});
  background-size: cover;
  background-position: center;

  .logo {
    position: absolute;
    width: ${({ mainImgSize }) => mainImgSize};
    height: ${({ mainImgSize }) => mainImgSize};
    bottom: -30px;
    left: 30px;
    border-radius: 100%;
    border: solid 3px white;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.15);
  }
`;

export const SidebarHeader = ({
  coverImg,
  mainImg,
  height = '200px',
  mainImgSize = '120px'
}) => {
  return (
    <SidebarHeaderContainer
      coverImg={coverImg}
      height={height}
      mainImgSize={mainImgSize}
    >
      <img className="logo" src={mainImg} />
    </SidebarHeaderContainer>
  );
};

export default SidebarHeader;
