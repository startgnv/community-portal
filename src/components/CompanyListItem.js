import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const CompanyListItemContainer = styled.li`
  list-style-type: none;
`;

export const CompanyListItem = ({ company }) => (
  <CompanyListItemContainer>
    <Link to={`/company/${company.name}`}>{company.name}</Link>
  </CompanyListItemContainer>
);

export default CompanyListItem;
