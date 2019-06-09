import React from 'react';
import styled from 'styled-components/macro';
import { Redirect } from 'react-router-dom';

const MapPageJobContainer = styled.div`
  .header {
    height: 200px;
    background-image: url(${props => props.coverImg});
    background-size: cover;
    background-position: center;
  }
`;

export const MapPageJob = ({
  history: { goBack },
  job: { title: jobTitle } = {},
  company: { name: companyName, logoImg = '', coverImg = '' } = {}
}) => {
  if (!jobTitle) {
    return <Redirect to="/" />;
  }
  return (
    <MapPageJobContainer coverImg={coverImg}>
      <button type="button" onClick={goBack}>
        Back
      </button>
      <p>{jobTitle}</p>
      <p>{companyName}</p>
    </MapPageJobContainer>
  );
};

export default MapPageJob;
