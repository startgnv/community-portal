import React from 'react';
import { storage } from '../../../firebase';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import styled from 'styled-components/macro';
import Link from 'src/components/Site/UI/Link';
import { clearFix } from 'polished';
import StorageImg from '../UI/StorageImg';

const JobListItemContainer = styled.div`
  list-style-type: none;

  display: block;
  text-decoration: none;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
  background: white;
  transition: 200ms;
  ${clearFix()}

  &:hover {
    box-shadow: 3px 3px 13px 0 rgba(0, 0, 0, 0.15);
    transform: scale(1.04);
    transform-origin: center;
  }

  .company-img {
    display: block;
    width: 40px;
    height: 40px;
  }

  .job {
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .company {
    font-size: 13px;
    line-height: 16px;
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Images = styled.div`
  display: flex;
`;

const CompanyCover = styled.div`
  flex: 1;
  height: 40px;
  background-image: url(${({ coverImg }) => coverImg});
  background-size: cover;
  background-position: center;
`;

const JobInfo = styled.div`
  display: flex;
  height: 70px;
  padding: 15px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  text-align: left;
`;

const JobTitle = styled.span`
  display: block;
  width: 100%;
  font-size: 13px;
  color: ${({ theme }) => theme.deepNavy};
  line-height: 16px;
  text-transform: uppercase;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
}) => {
  const [coverUrl] = useDownloadURL(
    company.coverPath ? storage.ref(company.coverPath) : ''
  );
  return (
    <JobListItemContainer>
      {showCompanyInfo && (
        <Images>
          <CompanyCover coverImg={coverUrl} />
          <StorageImg
            className="company-img"
            alt={`${company.name}`}
            path={company.logoPath}
          />
        </Images>
      )}
      <JobInfo>
        <JobTitle>
          <Link className="job" to={`/jobs/${id}`}>
            {title}
          </Link>
        </JobTitle>
        {showCompanyInfo && (
          <div>
            <Link className="company" to={`/companies/${company.slug}`}>
              {company.name}
            </Link>
          </div>
        )}
      </JobInfo>
    </JobListItemContainer>
  );
};

export default JobListItem;
