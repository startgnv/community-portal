import _ from 'lodash';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { baseContentStyling } from './mixins';
import { device } from './device';
import AppContext from './AppContext';
import PageContent from './PageContent';
import Hero from './Hero';
import Button from './Button';
import Tags from './Tags';
import heroImg from '../assets/images/sparkgnv-101.jpg';
import { Helmet } from 'react-helmet';

const EcosystemItem = styled.div`
  display: flex;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.08);
  transition: 200ms;
  background: white;
  justify-content: center;
  box-sizing: border-box;

  .eco-tags {
    margin-bottom: 10px;
  }
`;

const PageDescription = styled.span`
  display: block;
  margin-bottom: 30px;
  max-width: 600px;
  font-size: 1.6rem;
  line-height: 2.2rem;
`;

const EcoContent = styled.div`
  flex: 1;
`;

const EcoActions = styled.div`
  margin-left: 20px;
`;

const EcoName = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 600;
`;

const EcoDescription = styled.div`
  ${baseContentStyling()}
`;

const EcoCategories = styled.div`
  font-size: 14px;
`;

const EcosystemPage = () => {
  const {
    ecosystem,
    ecosystemCategories,
    ecosystemLoading,
    ecosystemCategoriesLoading
  } = useContext(AppContext);

  if (ecosystemLoading || ecosystemCategoriesLoading) {
    return false;
  }

  return (
    <>
      <Helmet>
        <title>Ecosystem - startGNV</title>
        <meta
          name="description"
          content="A quick guide to the tech and startup organizations, meetups, events, incubators, support centers and media."
        />
        <meta
          name="og:title"
          property="og:title"
          content="Ecosystem - startGNV"
        />
        <meta
          name="og:description"
          property="og:description"
          content="startGNV is an initiative by startupGNV to promote and grow the Gainesville startup, tech, and biotech communities."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <>
        <Hero bgImage={heroImg} title="Ecosystem" />
        <PageContent>
          <PageDescription>
            A quick guide to the tech and startup organizations, meetups,
            events, incubators, support centers and media.
          </PageDescription>
          {ecosystem.map(({ name, description, categories, link }, i) => {
            const renderCategories = _.filter(ecosystemCategories, category => {
              return categories.indexOf(category.id) > -1;
            });
            return (
              <EcosystemItem key={i}>
                <EcoContent>
                  <EcoName>{name}</EcoName>
                  <Tags
                    className="eco-tags"
                    tags={renderCategories}
                    size="small"
                  />
                  <EcoDescription
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </EcoContent>
                {link && (
                  <EcoActions>
                    <Button
                      label="Visit Site"
                      onClick={() => window.open(link)}
                    />
                  </EcoActions>
                )}
              </EcosystemItem>
            );
          })}
        </PageContent>
      </>
    </>
  );
};

export default EcosystemPage;
