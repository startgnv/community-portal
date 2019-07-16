import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import JobList from './JobList';

const MapPageIndexContainer = styled.div`
  padding: 20px;
`;

export const MapPageIndex = ({
  jobs = [],
  categories = [],
  companies = [],
  jobsFilter
}) => {
  return (
    <MapPageIndexContainer>
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
