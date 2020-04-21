import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  padding: 20px 20px 30px 20px;

  > p {
    margin-bottom: 30px;
    line-height: 1.4rem;
  }
`;

const PageContainer = ({ children }) => <Container>{children}</Container>;

export default PageContainer;
