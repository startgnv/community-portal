import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import AppContext from './AppContext';
import Header from './Job/Header';
import JobList from './JobList';
import Error from './Error';
import MapContainer from './MapContainer';
import MapPin from './MapPin';
import { Marker } from 'react-map-gl';
import { Helmet } from 'react-helmet';

import { LinearProgress } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

const CompanyPageContainer = styled.div`
  background: ${({ theme }) => theme.uiBackground};
`;

const CompanyContent = styled.div`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  padding: 30px 20px 20px;

  .description {
    margin-bottom: 30px;
  }
`;

const EmployeeCount = styled.span`
  display: inline-block;
  margin-right: 10px;
`;

const CompanyLink = styled.span`
  display: inline-block;
  margin-right: 15px;

  .link-icon {
    margin-right: 5px;
    line-height: 26px;
    vertical-align: top;
  }

  a {
    color: ${({ theme }) => theme.textDark};
    line-height: 26px;
    text-decoration: none;
  }
`;

const MapWrap = styled.div`
  height: 200px;
  margin-top: 30px;
`;

export const CompanyPage = ({
  match: {
    params: { companySlug }
  }
}) => {
  const [companyValue, companyLoading, companyError] = useCollection(
    db.collection('companies').where('slug', '==', companySlug)
  );
  const { jobs, jobsLoading } = useContext(AppContext);
  if (companyLoading || jobsLoading) {
    return <LinearProgress />;
  }
  if (companyError || companyValue.empty) {
    return <Error />;
  }
  const company = {
    id: companyValue.docs[0].id,
    ...companyValue.docs[0].data()
  };
  const {
    id,
    name,
    logoPath,
    coverPath = '',
    description = '',
    url = '',
    coordinates: { latitude, longitude },
    employeeCount = 0
  } = company;
  const viewport = {
    latitude,
    longitude,
    zoom: 12
  };
  const companyJobs = jobs.filter(job => job.companyID === id);

  return (
    <>
      <Helmet>
        <title>startGNV - {name}</title>
        <meta name="description" content={description} />
        <meta
          name="og:title"
          property="og:title"
          content={`${name} - startGNV`}
        />
        <meta
          name="og:description"
          property="og:description"
          content={description}
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <CompanyPageContainer>
        <Header title={name} coverPath={coverPath} logoPath={logoPath}>
          {employeeCount && (
            <EmployeeCount>
              <span>{`${employeeCount} Employees`}</span>
            </EmployeeCount>
          )}
          <CompanyLink>
            <a href={url} rel="noopener noreferrer" target="_blank">
              <LinkIcon className="link-icon" />
              Open Website
            </a>
          </CompanyLink>
        </Header>
        <CompanyContent>
          <p className="description">{description}</p>
          {companyJobs && companyJobs.length > 0 && (
            <JobList jobs={companyJobs} showCompanyInfo={false} />
          )}
          <MapWrap>
            <MapContainer viewport={viewport}>
              <Marker longitude={longitude} latitude={latitude}>
                <MapPin size={36} />
              </Marker>
            </MapContainer>
          </MapWrap>
        </CompanyContent>
      </CompanyPageContainer>
    </>
  );
};

export default CompanyPage;
