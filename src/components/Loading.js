import React from 'react';
import styled from 'styled-components';
import loadingAnimation from '../assets/images/loading.svg';

const LoadingContainer = styled.div`
  display: flex;
  height: ${({ height }) => height};
  justify-content: center;
`;

const Loading = ({ size = 40, containerHeight = 'auto' }) => (
  <LoadingContainer height={containerHeight}>
    <img src={loadingAnimation} width={size} />
  </LoadingContainer>
);

export default Loading;
