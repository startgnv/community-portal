import React from 'react';
import styled from 'styled-components/macro';

const PageContentContainer = styled.div`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  padding: 20px 20px 30px 20px;

  > p {
    margin-bottom: 30px;
  }
`;

const PageContent = ({ children }) => (
  <PageContentContainer>{children}</PageContentContainer>
);

export default PageContent;
