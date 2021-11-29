import { useRouter } from 'next/router';
import { baseContentStyling } from 'src/components/utils/mixins';
import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import firebase, { db } from 'src/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import AppContext from 'src/components/AppContext';
import { LinearProgress } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { device } from 'src/components/utils/device';
import LinkIcon from '@material-ui/icons/Link';
import Header from 'src/components/Site/Job/Header';
import Link from 'src/components/Site/UI/Link';
import BusinessIcon from '@material-ui/icons/Business';
import { Parser } from 'html-to-react';
import EcosystemCard from 'src/components/Site/Ecosystem/EcosystemCard';
import JobCategories from 'src/components/Site/Job/JobCategories';

const html = new Parser();

const EcosystemPageContainer = styled.div`
  background: ${({ theme }) => theme.uiBackground};

  .company-name {
    margin: 0 0 10px;
  }

  .company-link {
    display: inline-block;
    margin-right: 20px;
    height: 26px;
    line-height: 26px;
    vertical-align: top;
    font-size: 16px;
    font-weight: 400;
    text-decoration: none;
    color: ${({ theme }) => theme.textDark};
  }

  .company-icon {
    line-height: 26px;
    vertical-align: top;
  }
`;

const Main = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  padding: 30px 0 0 0;

  @media ${device.tabletPort}, ${device.mobile} {
    flex-flow: column nowrap;
  }
`;

const ContentContainer = styled.div`
  flex: 5;
  padding: 0 30px 20px;
`;
const EcoItemDescription = styled.div`
  ${baseContentStyling()}
  width: 95%;
  p {
    color: ${props => props.theme.textLight};
    margin-bottom: 10px;
    font-size: 1rem;
    line-height: 1.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const Sidebar = styled.div`
  flex: 2;

  @media ${device.tabletPort}, ${device.mobile} {
    padding-left: 30px;
    padding-right: 30px;
  }
`;


const CategoriesContainer = styled.div`
  display: inline-block;
`;

const InfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  border-radius: 3px;
  border-left: 3px solid #709dae;
  box-shadow: 3px 3px 13px rgba(0, 0, 0, 0.15);
  background-color: white;
  padding: 12px 30px 12px 0;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const InfoBoxMessage = styled.p`
  font-family: Montserrat, sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: #709dae;
`;
const Description = styled.div`
  ${baseContentStyling()}
`;
const EcosystemLink = styled.span`
  display: inline-block;
  margin-right: 15px;

  .link-icon {
    margin-right: 5px;
    line-height: 26px;
    vertical-align: top;
  }

  a {
    color: ${({ theme }) => theme.textDark};
    line-height: 26px;
    text-decoration: none;
  }
`;
const InfoIcon = styled.img`
  margin: 0 16px;
`;
//ecosystem slug logic goes here 

const EcosystemPage = () => {
    const router = useRouter();
    const { ecosystemSlug } = router.query;

    const [ecosystemValue, ecosystemLoading, ecosystemError] = ecosystemSlug ? useCollection(
        db.collection('ecosystem').where(firebase.firestore.FieldPath.documentId()
        , '==', ecosystemSlug || '')
      ) : [] ;
    
      const ecosystem = {
        id: ecosystemValue?.docs[0]?.id,
        ...ecosystemValue?.docs[0]?.data()
      };

      const{
        id,
        name,
        categories,
        location,
        logoPath: companyLogoPath = '',
        coverPath: companyCoverPath = '',
        thumbnail,
        description = '',
        link,
        slug = ''
      } = ecosystem;
    if (ecosystemLoading) {
        return <LinearProgress />;
    }
    if (ecosystemError) {
        return <h1>Error</h1>;
    }

    return (
        <>
          <Helmet>
            <title>{`${name}`}</title>
            <meta name="description" content={`${name}`} />
            <meta name="og:title" property="og:title" content={name} />
            <meta
              name="og:description"
              property="og:description"
             content={description}
            />
            <meta property="og:type" content="website" />
          </Helmet>
    
          <EcosystemPageContainer>
            <Header
            url={thumbnail}
            coverHeight={160}
            mainImgSize={80}
            title={name}
            >
            <EcosystemLink className="company-link" to={'/ecosystem/' + ecosystemSlug}> 
              <BusinessIcon className="company-icon" />
            {name}    
            <a href={link} rel="noopener noreferrer" target="_blank">
              <LinkIcon className="link-icon" />
              Open Website
            </a>     
              </EcosystemLink>

              {categories && categories.length > 0 && (
            <CategoriesContainer>
              <JobCategories limit={5} categories={categories} />
            </CategoriesContainer>
          )}
                  
            </Header>

            <Main>
              <ContentContainer>
                  <EcoItemDescription>{html.parse(description)}</EcoItemDescription> 
              </ContentContainer>
              <Sidebar>
                <EcosystemCard
                name={name}
                logo={thumbnail}
                link = {link}
                location = {location}
                summary={description}
                slug={ecosystemSlug}
                />
                
          </Sidebar>
            </Main>
          </EcosystemPageContainer>
        </>
      );
    };
    
    export default EcosystemPage;
    