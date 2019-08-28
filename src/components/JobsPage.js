import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Hero from './Hero';
import Error from './Error';
import PageContent from './PageContent';
import JobList from './JobList';
import JobsFilter from './JobsFilter';

import { LinearProgress } from '@material-ui/core';

const HeroHeadline = styled.h2`
  font-size: 46px;
  color: white;

  strong {
    color: ${({ theme }) => theme.teal};
    font-weight: 700;
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

export const MapPageIndex = () => {
  const [jobsValue, jobsLoading, jobsError] = useCollection(
    db.collection('jobs')
  );
  const [companiesValue, companiesLoading, companiesError] = useCollection(
    db.collection('companies')
  );
  const [jobsFilter, setJobsFilter] = useState({ search: '', categories: [] });
  const onFilterChange = filterChanged => {
    setJobsFilter({
      ...jobsFilter,
      ...filterChanged
    });
  };
  if (companiesError || jobsError) {
    return <Error />;
  }
  if (companiesLoading || jobsLoading) {
    return <LinearProgress />;
  }
  const jobs = jobsValue.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const companies = companiesValue.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return (
    <>
      <Hero>
        <HeroHeadline>Jobs</HeroHeadline>
      </Hero>
      <PageContent>
        <FilterContainer>
          <JobsFilter onChange={onFilterChange} />
        </FilterContainer>
        <JobList
          jobs={jobs}
          companies={companies}
          filter={jobsFilter}
          showDescription={false}
        />
      </PageContent>
    </>
  );
};

export default MapPageIndex;
