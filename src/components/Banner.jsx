import React from 'react'
import styled from 'styled-components';
import { device } from './utils/device';

const BannerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.blue};
  padding: 16px;
  margin-bottom: 20px;
  font-size: 20px;
  color: #fff;
  
  @media ${device.tabletPort} {
    font-size: 16px;
    padding: 10px;
  }
`;

const Message = styled.p`
  color: #fff
`
const BannerLink = styled.a`
  color: #fff;
  text-decoration: underline;
`

export const Banner = ({externalHref, description, callToActionText}) => {
  return (
    <BannerDiv>
      <Message>
        {description}
      </Message>
      <BannerLink href={externalHref} target="_blank" rel="noopener noreferrer">
        {callToActionText}
      </BannerLink>
    </BannerDiv>
  )
}
