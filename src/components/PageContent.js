import React from 'react';
import styled from 'styled-components/macro';

const PageContentContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 20px 0;

  > p {
    margin-bottom: 30px;
  }

  > ul {
    margin: 0 0 30px 30px;

    > li {
      margin-bottom: 5px;
      list-style: disc;
    }
  }
`;

const PageContent = ({ children }) => (
  <PageContentContainer>{children}</PageContentContainer>
);

export default PageContent;
