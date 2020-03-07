import React, { useContext } from 'react';
import styled from 'styled-components';
import { device } from '../device';
import StorageImg from '../StorageImg';
import { Link } from 'react-router-dom';

const Card = styled.div`
  margin-bottom: 30px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.08);
  transition: 200ms;
  cursor: pointer;
  background: white;

  &:hover {
    box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
    transform: scale(1.01);
    transform-origin: center;
  }

  @media ${device.tabletPort} {
    display: flex;
    flex-flow: row nowrap;
    height: 160px;
  }
`;

const Thumbnail = styled.div`
  height: 100%;

  @media ${device.tabletPort} {
    min-width: 160px;
  }
`;

const Content = styled.div`
  padding: 25px;
`;

const Name = styled.h4`
  font-family: WilliamsCaslonText, serif;
  font-size: 18px;
  color: #131516;
  margin-bottom: 3px;
`;

const Count = styled.h5`
  font-family: WilliamsCaslonText, serif;
  font-size: 16px;
  color: #a3a9b3;
`;

const Summary = styled.p`
  font-family: WilliamsCaslonText, serif;
  font-size: 16px;
  color: #131516;
  line-height: 1.2rem;
  margin-top: 5px;
`;

const CompanyCard = ({ name, logo, employeeCount, summary, slug }) => {
  return (
    <Link style={{ textDecoration: 'none' }} to={'/companies/' + slug}>
      <Card>
        <Thumbnail>
          <StorageImg
            alt="Company Logo"
            path={logo}
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          />
        </Thumbnail>
        <Content>
          <Name>{name}</Name>
          <Count>{employeeCount} Employees</Count>
          <Summary>{summary}</Summary>
        </Content>
      </Card>
    </Link>
  );
};

export default CompanyCard;
