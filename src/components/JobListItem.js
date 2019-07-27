import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import JobCategories from './JobCategories';
import StorageImg from './StorageImg';

const JobListItemContainer = styled.li`
  list-style-type: none;

  .container-link {
    display: flex;
    padding: 10px 10px 10px 13px;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: 250ms;
    text-decoration: none;

    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }

  .company-img {
    display: block;
    flex: 1;
    width: 80px;
    height: 80px;
    max-width: 80px;
    float: left;
    border-radius: 100%;
    margin-right: 20px;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.15);
  }

  .info {
    flex: 2;
    overflow: hidden;
  }

  .title {
    display: block;
    font-size: 16px;
    color: #333;
    line-height: 22px;
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

  .description {
    margin: 0;
    font-size: 12px;
    line-height: 18px;
    height: 36px;
    overflow: hidden;
  }
`;

const CategoriesContainer = styled.div`
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
    <Link className="container-link" to={`/job/${id}`}>
      {showCompanyInfo && (
        <StorageImg
          className="company-img"
          alt={`${company.name}`}
          path={company.logoPath}
        />
      )}
      <div className="info">
        <span className="title">{title}</span>
        {showCompanyInfo && (
          <div>
            <Link className="company" to={`/company/${company.slug}`}>
              {company.name}
            </Link>
          </div>
        )}
        {categories && categories.length > 0 && (
          <CategoriesContainer>
            <JobCategories categories={categories} size="small" limit={2} />
          </CategoriesContainer>
        )}
        {showDescription && <p className="description">{description}</p>}
      </div>
    </Link>
  </JobListItemContainer>
);

export default JobListItem;
