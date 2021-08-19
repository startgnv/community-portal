import _ from 'lodash';
import React, { useContext } from 'react';
import { baseContentStyling } from 'src/components/utils/mixins';
import BusinessIcon from '@material-ui/icons/Business';
import styled from 'styled-components/macro';
import AppContext from 'src/components/AppContext';
import Header from 'src/components/Site/Job/Header';
import Link from 'src/components/Site/UI/Link';
import JobCategories from 'src/components/Site/Job/JobCategories';
import ApplyBtn from 'src/components/Site/Job/ApplyBtn';
import { LinearProgress } from '@material-ui/core';
import { Parser } from 'html-to-react';
import { Helmet } from 'react-helmet';
import CompanyCard from 'src/components/Site/Job/CompanyCard';
import { device } from 'src/components/utils/device';
import { useRouter } from 'next/router';

const htmlParser = new Parser();

const Container = styled.div`
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

const Sidebar = styled.div`
  flex: 2;

  @media ${device.tabletPort}, ${device.mobile} {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const Description = styled.div`
  ${baseContentStyling()}
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

const InfoIcon = styled.img`
  margin: 0 16px;
`;

export const JobPage = () => {

  const router = useRouter();
  const { jobID } = router.query;

  const { jobs, companies, jobsLoading, companiesLoading } = useContext(
    AppContext
  );

  if (jobsLoading || companiesLoading) {
    return <LinearProgress />;
  }

  const job = _.find(jobs, { id: jobID });
  const {
    title: jobTitle,
    description: jobDescription,
    categories,
    companyID
  } = job;
  const {
    name: companyName,
    logoPath: companyLogoPath = '',
    coverPath: companyCoverPath = '',
    slug: companySlug,
    employeeCount: companyEmployeeCount,
    shortDescription: companyShortDescription
  } = _.find(companies, { id: companyID });

  if (!jobTitle) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>{`${companyName} - ${jobTitle}`}</title>
        <meta name="description" content={`${companyName} - ${jobTitle}`} />
        <meta name="og:title" property="og:title" content={companyName} />
        <meta
          name="og:description"
          property="og:description"
          content={jobTitle}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Container>
        <Header
          coverPath={companyCoverPath}
          logoPath={companyLogoPath}
          coverHeight={160}
          mainImgSize={80}
          title={jobTitle}
        >
          <Link className="company-link" to={'/companies/' + companySlug}>
            <BusinessIcon className="company-icon" />
            {companyName}
          </Link>
          {categories && categories.length > 0 && (
            <CategoriesContainer>
              <JobCategories limit={5} categories={categories} />
            </CategoriesContainer>
          )}
        </Header>

        <Main>
          <ContentContainer>
            <Description>{htmlParser.parse(jobDescription)}</Description>
          </ContentContainer>

          <Sidebar>
            <ApplyBtn job={job} companyName={companyName} />
            <InfoBox>
              <InfoIcon src='/assets/images/heart.svg' alt="Heart" />
              <InfoBoxMessage>
                Let them know you heard about the role from 'startGNV's Job
                Board'.
              </InfoBoxMessage>
            </InfoBox>
            <CompanyCard
              name={companyName}
              logo={companyLogoPath}
              employeeCount={companyEmployeeCount}
              summary={companyShortDescription}
              slug={companySlug}
            />
          </Sidebar>
        </Main>
      </Container>
    </>
  );
};

export default JobPage;
