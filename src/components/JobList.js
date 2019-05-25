import React from 'react';
import styled from 'styled-components/macro';

const JobListContainer = styled.ul`
  padding: 0;
  margin: 0 0 30px;
  overflow: hidden;
`;

export const JobList = ({ children, className }) => (
  <JobListContainer className={className}>{children}</JobListContainer>
);

export default JobList;
