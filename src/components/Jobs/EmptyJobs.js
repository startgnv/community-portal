import React from 'react';
import styled from 'styled-components/macro';

const EmptyContainer = styled.div`
  display: flex;
  height: 30vh;
  align-items: center;
  justify-content: center;
`;

const EmptyJobs = () => (
  <EmptyContainer>
    <p>Whoops! No jobs fit your criteria.</p>
  </EmptyContainer>
);

export default EmptyJobs;
