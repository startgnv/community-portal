import React, { useState } from 'react';
import JobList from './JobList';
import JobListItem from './JobListItem';

export const MapPageIndex = ({ jobs = [] }) => {
  const [filterText, setFilterText] = useState('');

  const filteredJobs = jobs.filter(e =>
    e.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
      />
      <JobList>
        {filteredJobs.map(job => (
          <JobListItem job={job} key={job.id} />
        ))}
      </JobList>
    </div>
  );
};

export default MapPageIndex;
