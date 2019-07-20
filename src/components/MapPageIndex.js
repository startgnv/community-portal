import React, { useState } from 'react';
import styled from 'styled-components/macro';
import JobList from './JobList';
import JobsFilter from './JobsFilter';

const MapPageIndexContainer = styled.div`
  padding: 20px;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

export const MapPageIndex = ({ jobs = [], companies = [] }) => {
  const [jobsFilter, setJobsFilter] = useState({ search: '', categories: [] });
  const onFilterChange = filterChanged => {
    setJobsFilter({
      ...jobsFilter,
      ...filterChanged
    });
  };
  return (
    <MapPageIndexContainer>
      <FilterContainer>
        <JobsFilter onChange={onFilterChange} />
      </FilterContainer>
      <JobList
        jobs={jobs}
        companies={companies}
        filter={jobsFilter}
        showDescription={false}
      />
    </MapPageIndexContainer>
  );
};

export default MapPageIndex;
