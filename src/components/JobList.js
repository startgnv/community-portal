import React from 'react';
import styled from 'styled-components/macro';

const JobListContainer = styled.ul`
  padding: 0;
  margin: 0 -10px 30px;
  overflow: hidden;

  .list-title {
    margin: 0 0 0 10px;
  }
`;

export const JobList = ({
  children,
  className,
  showTitle = true,
  jobCount = 0
}) => {
  return (
    <JobListContainer className={className}>
      {showTitle && <h3 className="list-title">Jobs ({jobCount})</h3>}
      {children}
    </JobListContainer>
  );
};

export default JobList;
