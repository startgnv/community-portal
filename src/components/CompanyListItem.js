import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const CompanyListItemContainer = styled.li`
  list-style-type: none;
  background-color: white;
  box-sizing: border-box;
  margin: 10px;
  height: 100px;
  width: 80px;
`;

export const CompanyListItem = ({ company }) => (
  <CompanyListItemContainer>
    <Link to={`/company/${company.name}`}>{company.name}</Link>
  </CompanyListItemContainer>
);

export default CompanyListItem;
