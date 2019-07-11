import React from 'react';
import styled from 'styled-components/macro';
import Button from './Button';

const JobsFilterContainer = styled.div`
  height: 50px;
  padding: 0 20px;

  .filter-label {
    display: inline-block;
    height: 50px;
    line-height: 50px;
  }
`;

const JobsFilter = () => (
  <JobsFilterContainer>
    <span className="filter-label">Filter:</span>
  </JobsFilterContainer>
);

export default JobsFilter;
