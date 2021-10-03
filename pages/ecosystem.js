import _ from 'lodash';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import AppContext from 'src/components/AppContext';
import PageContainer from 'src/components/Site/UI/PageContainer';
import EcosystemFilter from 'src/components/Site/Ecosystem/EcosystemFilter';
import Hero from 'src/components/Site/UI/Hero';
import { Helmet } from 'react-helmet';
import EcosystemCard from 'src/components/Site/Ecosystem/EcosystemCard';

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
  padding-bottom: 10px;
  border-bottom: solid 3px ${props => props.theme.uiBorder};
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
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
    categories: [],
    types: []
  });
  const [sliceEnd, setSliceEnd] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState("");

  const onFilterChange = filterChanged => {
    setEcoFilter({
      ...ecoFilter,
      ...filterChanged
    });
    setSliceEnd(3);
    setSelectedCategory("");
  };

  const searchFilter = ecoItem =>
    ecoItem.name.toLowerCase().includes(ecoFilter.search);

  const categoryFilter = ecoItem =>
    ecoFilter.categories.length
      ? _.intersection(ecoFilter.categories, ecoItem.categories).length
      : true;

  const typeFilter = ecoItem =>
    ecoFilter.types.length
      ? ecoFilter.types.includes(ecoItem.type)
      : true;

  const changeShow = category => {
    setSliceEnd(sliceEnd > 0 ? -1 : 3);
    setSelectedCategory(selectedCategory == "" ? category : "" );
  }
    
  const renderEcoItems = ecosystem
    .filter(ecoItem => searchFilter(ecoItem) && categoryFilter(ecoItem) && typeFilter(ecoItem))
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
        <Hero bgImage='/assets/images/sparkgnv-101.jpg' title="Ecosystem" />
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
          {ecosystemCategories.map(category =>{
            if((ecoFilter.categories.length == 0 || ecoFilter.categories.includes(category.id)) && (selectedCategory == "" || category.id == selectedCategory)){
              return(
                <><SectionHeader>{category.name}</SectionHeader>
                <ItemGrid>
              {renderEcoItems.filter(item => item.categories.includes(category.id)).slice(0,sliceEnd > 0 ? sliceEnd : renderEcoItems.length).map(
                ({
                  name,
                  description,
                  categories,
                  link,
                  location,
                  eventDate,
                  thumbnail
                }) => {

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
                <p onClick = {() => changeShow(category.id)}>{sliceEnd > 0 ? "Show More..." : "Show Less..." }</p>
                </ItemGrid></>
              );
            }
        })}
        </PageContainer>
      </>
    </>
  );
};

export default EcosystemPage;
