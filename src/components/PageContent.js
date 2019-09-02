import React from 'react';
import styled from 'styled-components/macro';

const PageContentContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 20px 0;

  h1 {
    font-size: 68px;
  }

  h2 {
    font-size: 40px;
  }

  h3 {
    font-size: 32px;
  }

  h4 {
    font-size: 24px;
  }

  h5 {
    font-size: 18px;
  }

  h6 {
    font-size: 14px;
  }

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
