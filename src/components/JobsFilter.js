import React from 'react';
import styled from 'styled-components/macro';
import Button from './Button';

const JobsFilterContainer = styled.div`
  padding: 10px 20px;
  text-align: right;

  .filter-label {
    display: inline-block;
    height: 30px;
    margin-right: 10px;
    line-height: 30px;
  }
`;

const FilterItem = styled.div`
  display: inline-block;
  margin-right: 10px;
`;

const JobsFilter = () => (
  <JobsFilterContainer>
    <span className="filter-label">Filter:</span>
    <FilterItem>
      <Button label="Categories" style="outline" />
    </FilterItem>
    <FilterItem>
      <Button label="Experience Level" style="outline" />
    </FilterItem>
  </JobsFilterContainer>
);

export default JobsFilter;
