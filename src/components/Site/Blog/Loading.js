import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: ${({ height }) => height};
  justify-content: center;
`;

const Loading = ({ size = 40, containerHeight = 'auto' }) => (
  <Container height={containerHeight}>
    <img src="/assets/images/loading.svg" width={size} />
  </Container>
);

export default Loading;
