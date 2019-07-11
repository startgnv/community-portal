import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const TooltipContainer = styled.div`
  width: 250px;
  padding: 30px;
  background-image: url(${({ coverImg }) => coverImg});
  border-radius: 3px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  overflow: hidden;

  .primary-img {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    left: 30px;
    border-radius: 100%;
    border: solid 3px white;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.15);
  }

  .title {
    display: block;
  }
`;

const CoverProfileTooltip = ({
  primaryImg,
  coverImg,
  title,
  linkTo,
  className = ''
}) => (
  <TooltipContainer className={className} coverImg={coverImg}>
    <Link to={linkTo}>
      <img className="primary-img" src={primaryImg} />
      <span className="title">{title}</span>
    </Link>
  </TooltipContainer>
);

export default CoverProfileTooltip;
