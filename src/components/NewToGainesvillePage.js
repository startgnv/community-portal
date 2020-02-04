import React from 'react';
import styled from 'styled-components';
import { device } from './device';
import PageContent from './PageContent';
import Hero from './Hero';
import RecentBlogPosts from './RecentBlogPosts';
import Button from './Button';
import guidePreview from '../assets/images/ecosystem-preview.jpg';
const pdfURL =
  'https://firebasestorage.googleapis.com/v0/b/startupgnv-39bca.appspot.com/o/GainesvilleTechEcosystem-Q1-2020.pdf?alt=media&token=84b6e949-d026-4b53-a80b-e1f04a8d41df';

const NewToGNVContainer = styled.div``;

const PageInner = styled.div`
  display: flex;

  @media ${device.tabletPort}, ${device.mobile} {
    flex-direction: column-reverse;
  }
`;

const BlogPosts = styled.ul`
  flex: 2;
  margin-right: 30px;

  @media ${device.tabletPort}, ${device.mobile} {
    margin-right: 0;
  }
`;

const GuideContainer = styled.div`
  flex: 3;

  @media ${device.tabletPort}, ${device.mobile} {
    margin-bottom: 30px;
  }
`;

const EcosystemPreviewImg = styled.img`
  display: block;
  width: 100%;
`;

const NewToGainesvillePage = () => (
  <NewToGNVContainer>
    <Hero title="New To GNV" />
    <PageContent>
      <PageInner>
        <BlogPosts>
          <RecentBlogPosts dir="vertical" limit={0} />
        </BlogPosts>
        <GuideContainer>
          <EcosystemPreviewImg
            src={guidePreview}
            alt="Gainesville Ecosystem Guide PDF"
          />
          <Button
            size="large"
            label="Download the Guide"
            fullWidth
            onClick={() => window.open(pdfURL)}
          />
        </GuideContainer>
      </PageInner>
    </PageContent>
  </NewToGNVContainer>
);

export default NewToGainesvillePage;
