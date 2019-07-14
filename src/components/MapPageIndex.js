import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import JobList from './JobList';
import JobListItem from './JobListItem';

const MapPageIndexContainer = styled.div`
  padding: 20px;
`;

export const MapPageIndex = ({
  jobs = [],
  categories = [],
  companies = []
}) => {
  const [filterText, setFilterText] = useState('');

  const filteredJobs = jobs.filter(e =>
    e.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <MapPageIndexContainer>
      {/*
        <input
          type="text"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
      */}
      <JobList jobCount={filteredJobs.length}>
        {filteredJobs.map(job => {
          const jobCompany = _.find(companies, { id: job.companyID });
          return (
            <JobListItem
              job={job}
              company={jobCompany}
              key={job.id}
              showDescription={false}
            />
          );
        })}
      </JobList>
    </MapPageIndexContainer>
  );
};

export default MapPageIndex;
