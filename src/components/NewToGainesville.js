import React from 'react';
import styled from 'styled-components/macro';
import PageContent from './PageContent';
import phone from '../assets/images/phone.png';

const NewContainer = styled.div`
  padding: 30px 80px 40px 0;
  background-color: white;
`;

const NewTitle = styled.h2`
  position: relative;
  display: inline-block;
  font-size: 33px;

  span {
    position: relative;
    z-index: 1;
  }

  &:before {
    position: absolute;
    display: block;
    width: 100%;
    height: 18px;
    bottom: 0;
    right: -16px;
    background-color: ${({ theme }) => theme.yellow};
    content: '';
    z-index: 0;
  }
`;

const NewHeader = styled.div`
  position: relative;
  margin-bottom: -60px;
  z-index: 10;
`;

const NewMainContent = styled.div`
  position: relative;
  max-width: 790px;
  padding: 100px 40px 40px;
  margin-left: 80px;
  background-color: ${({ theme }) => theme.uiBackground};
  z-index: 5;

  h3 {
    margin-bottom: 30px;
    line-height: 56px;
    border-bottom: solid 1px ${({ theme }) => theme.teal};
    font-size: 24px;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
  }

  li {
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
  }
`;

const GuideContent = styled.div`
  max-width: 470px;
`;

const MeetupContent = styled.div`
  position: absolute;
  max-height: 400px;
  width: 300px;
  bottom: -60px;
  right: -80px;
  overflow: hidden;

  p {
    position: relative;
    width: 100%;
    padding: 0 20px;
    margin-bottom: 20px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    box-sizing: border-box;
  }
`;

const PhoneImg = styled.img`
  display: block;
  width: 300px;
  max-width: 100%;
`;

const NewToGainesville = () => (
  <NewContainer>
    <PageContent>
      <NewHeader>
        <NewTitle>
          <span>New To Gainesville?</span>
        </NewTitle>
        <br />
        <NewTitle>
          <span>Start Here</span>
        </NewTitle>
      </NewHeader>
      <NewMainContent>
        <GuideContent>
          <h3>A techie's guide to Gainesville</h3>
          <ul>
            <li>Family friendly weekend happenings</li>
            <li>Gainesville city initiatives</li>
            <li>How to get involved</li>
          </ul>
        </GuideContent>
        <MeetupContent>
          <p>Check out the different Meetups Happening in GNV</p>
          <PhoneImg src={phone} alt="Gainesville Meetups" />
        </MeetupContent>
      </NewMainContent>
    </PageContent>
  </NewContainer>
);

export default NewToGainesville;
