import React from 'react';
import styled from 'styled-components';
import PageContent from './PageContent';

const FooterContainer = styled.div`
  background: ${({ theme }) => theme.deepNavy};
`;

const EmailSubscribe = styled.div`
  padding: 30px;
`;

const FooterContent = styled.div`
  padding: 30px;
`;

const Footer = () => (
  <FooterContainer>
    <PageContent>
      <EmailSubscribe />
      <FooterContent />
    </PageContent>
  </FooterContainer>
);

export default Footer;
