import React from 'react';
import styled from 'styled-components/macro';

const PageContentContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const PageContent = ({ children }) => (
  <PageContentContainer>{children}</PageContentContainer>
);

export default PageContent;
