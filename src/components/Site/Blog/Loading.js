import React from 'react';
import styled from 'styled-components';
import loadingAnimation from '../../../assets/images/loading.svg';

const Container = styled.div`
  display: flex;
  height: ${({ height }) => height};
  justify-content: center;
`;

const Loading = ({ size = 40, containerHeight = 'auto' }) => (
  <Container height={containerHeight}>
    <img src={loadingAnimation} width={size} />
  </Container>
);

export default Loading;
