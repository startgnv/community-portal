import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import Button from './Button';

const AddCompanyCTAContainer = styled.div`
  padding: 20px 0;
  text-align: center;
`;

const CTAHeadline = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const AddCompanyCTA = ({
  companies = [],
  jobs = [],
  onCompanyMouseEnter = () => {}
}) => {
  return (
    <AddCompanyCTAContainer>
      <CTAHeadline>Don't see your company here?</CTAHeadline>
      <Link to="/add-company">
        <Button label="Get added to the list" />
      </Link>
    </AddCompanyCTAContainer>
  );
};

export default AddCompanyCTA;
