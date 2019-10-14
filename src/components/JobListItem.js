import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { clearFix } from 'polished';
import JobCategories from './JobCategories';
import StorageImg from './StorageImg';
import Button from './Button';

const JobListItemContainer = styled.li`
  list-style-type: none;

  .link-container {
    display: block;
    padding: 13px;
    border-radius: 6px;
    text-decoration: none;
    box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
    background: white;
    ${clearFix()}

    &:hover {
      cursor: pointer;
    }
  }

  .company-img {
    display: block;
    flex: 1;
    width: 54px;
    height: 54px;
    max-width: 54px;
    float: left;
    border-radius: 3px;
    margin-right: 10px;
  }

  .company {
    display: inline-block;
    font-size: 13px;
    line-height: 16px;
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const JobInfo = styled.div`
  margin-bottom: 20px;
`;

const JobTitle = styled.span`
  display: block;
  font-size: 13px;
  color: ${({ theme }) => theme.deepNavy};
  height: 32px;
  line-height: 16px;
  text-transform: uppercase;
  font-weight: bold;
  overflow: hidden;
`;

const CategoriesContainer = styled.div`
  height: 22px;
  margin-bottom: 10px;
`;

export const JobListItem = ({
  job: {
    id,
    title = 'No Title',
    description = 'No Description',
    categories
  } = {},
  company = {},
  showCompanyInfo = true,
  showDescription = true
}) => (
  <JobListItemContainer>
    <Link className="link-container" to={`/jobs/${id}`}>
      {showCompanyInfo && (
        <StorageImg
          className="company-img"
          alt={`${company.name}`}
          path={company.logoPath}
        />
      )}
      <JobInfo>
        <JobTitle>{title}</JobTitle>
        {showCompanyInfo && (
          <div>
            <Link className="company" to={`/companies/${company.slug}`}>
              {company.name}
            </Link>
          </div>
        )}
        <CategoriesContainer>
          {categories && categories.length > 0 && (
            <JobCategories categories={categories} size="small" limit={1} />
          )}
        </CategoriesContainer>
      </JobInfo>
      <Button label="View Job" size="small" fullWidth />
    </Link>
  </JobListItemContainer>
);

export default JobListItem;
