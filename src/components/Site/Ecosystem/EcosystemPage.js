import _ from 'lodash';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import AppContext from '../../AppContext';
import PageContainer from '../UI/PageContainer';
import EcosystemFilter from './EcosystemFilter';
import Hero from '../UI/Hero';
import heroImg from '../../../assets/images/sparkgnv-101.jpg';
import { Helmet } from 'react-helmet';
import EcosystemCard from './EcosystemCard';

const PageDescription = styled.span`
  display: block;
  margin-bottom: 30px;
  max-width: 600px;
  font-size: 1.6rem;
  line-height: 2.2rem;
`;

const SectionHeader = styled.h2`
  font-family: Montserrat, sans-serif;
  font-size: 28px;
  color: ${props => props.theme.textDark};
  margin-bottom: 20px;
  margin-top: 50px;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const EcosystemPage = () => {
  const {
    ecosystem,
    ecosystemCategories,
    ecosystemLoading,
    ecosystemCategoriesLoading
  } = useContext(AppContext);
  const [ecoFilter, setEcoFilter] = useState({
    search: '',
    categories: []
  });

  const onFilterChange = filterChanged => {
    setEcoFilter({
      ...ecoFilter,
      ...filterChanged
    });
  };

  const searchFilter = ecoItem =>
    ecoItem.name.toLowerCase().includes(ecoFilter.search);

  const categoryFilter = ecoItem =>
    ecoFilter.categories.length
      ? _.intersection(ecoFilter.categories, ecoItem.categories).length
      : true;

  const renderEcoItems = ecosystem
    .filter(ecoItem => searchFilter(ecoItem) && categoryFilter(ecoItem))
    .sort((a, b) => a.description.length - b.description.length);

  const featuredEcoItems = renderEcoItems.filter(item => item.featured);

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
        <PageContainer>
          <PageDescription>
            A quick guide to the tech and startup organizations, meetups,
            events, incubators, support centers and media.
          </PageDescription>
          <EcosystemFilter onChange={onFilterChange} />
          {featuredEcoItems.length > 0 && (
            <>
              <SectionHeader>Featured Events</SectionHeader>
              <ItemGrid>
                {featuredEcoItems.map(
                  ({
                    name,
                    description,
                    categories,
                    link,
                    location,
                    eventDate,
                    thumbnail
                  }) => {
                    const renderCategories = _.filter(
                      ecosystemCategories,
                      category => {
                        return categories.indexOf(category.id) > -1;
                      }
                    );

                    return (
                      <EcosystemCard
                        key={name}
                        name={name}
                        description={description}
                        link={link}
                        location={location}
                        eventDate={eventDate}
                        thumbnail={thumbnail}
                      />
                    );
                  }
                )}
              </ItemGrid>
            </>
          )}

          {featuredEcoItems.length > 0 && (
            <SectionHeader>All Ecosystem</SectionHeader>
          )}
          <ItemGrid>
            {renderEcoItems.map(
              ({
                name,
                description,
                categories,
                link,
                location,
                eventDate,
                thumbnail
              }) => {
                const renderCategories = _.filter(
                  ecosystemCategories,
                  category => {
                    return categories.indexOf(category.id) > -1;
                  }
                );

                return (
                  <EcosystemCard
                    key={name}
                    name={name}
                    description={description}
                    link={link}
                    location={location}
                    eventDate={eventDate}
                    thumbnail={thumbnail}
                  />
                );
              }
            )}
          </ItemGrid>
        </PageContainer>
      </>
    </>
  );
};

export default EcosystemPage;
