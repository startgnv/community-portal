import _ from 'lodash';
import React, { useState } from 'react';
import JobList from './JobList';
import JobListItem from './JobListItem';

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
    <div>
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
          let jobCategories = [];
          if (job.categories && job.categories.length > 0) {
            jobCategories = _.filter(
              categories,
              category => job.categories.indexOf(category.id) > -1
            );
          }
          return (
            <JobListItem
              job={job}
              company={jobCompany}
              categories={jobCategories}
              key={job.id}
            />
          );
        })}
      </JobList>
    </div>
  );
};

export default MapPageIndex;
