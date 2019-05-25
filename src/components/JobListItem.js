import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const JobListItemContainer = styled.li`
  list-style-type: none;
`;

export const JobListItem = ({ job }) => (
  <JobListItemContainer>
    <Link to={`/job/${job.id}`}>{job.title}</Link>
  </JobListItemContainer>
);

export default JobListItem;
