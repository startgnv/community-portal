import React from 'react'
import styled from 'styled-components';
import { device } from './utils/device';

const BannerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.green };
  padding: 16px;
  margin-top: 20px;
  font-size: 20px;
  
  @media ${device.tabletPort} {
    font-size: 16px;
    padding: 10px;
  }
`;

const BannerLink = styled.a`
  color: #000;
`

export const Banner = ({link, text}) => {
  return (
    <BannerDiv>
      <BannerLink href={link} target="_blank" rel="noopener noreferrer">
       {text}
      </BannerLink>
    </BannerDiv>
  )
}
