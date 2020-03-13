import React from 'react';
import styled from 'styled-components';
import { device } from '../device';
import { Link } from 'react-router-dom';
import { storage } from '../../firebase';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import StorageImg from '../StorageImg';
import JobCategories from '../Job/JobCategories';

const ItemContainer = styled.div`
  height: 140px;
  margin-bottom: 30px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.08);
  transition: 200ms;
  cursor: pointer;
  background: white;
  justify-content: center;

  &:hover {
    box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
    transform: scale(1.01);
    transform-origin: center;
  }

  .company {
    font-size: 1rem;
    line-height: 1.2rem;
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .container-link {
    display: flex;
    text-decoration: none;
  }

  @media ${device.tabletPort}, ${device.mobile} {
    height: auto;

    .logo {
      top: auto;
      left: 20px;
      bottom: -26px;
    }
  }
`;

const LogoContainer = styled.div`
  display: flex;
  width: 140px;
  height: 140px;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
  background: url(${({ bgImg }) => bgImg});
  background-size: cover;
  background-position: center;

  .logo {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: solid 3px white;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    background: white;
  }
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${device.tabletPort}, ${device.mobile} {
    padding: 20px;
  }
`;

const JobName = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 1rem;
  color: ${({ theme }) => theme.deepNavy};
  line-height: 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
`;

const CategoriesContainer = styled.div`
  margin-bottom: 5px;
`;

const ShortDescription = styled.p`
  margin-bottom: 10px;
  font-size: 0.8rem;
  line-height: 1rem;
`;

const JobListItemLarge = ({
  job: { title, id, categories } = {},
  company = {},
  onMouseEnter = () => {}
}) => {
  const [coverUrl] = useDownloadURL(
    company.coverPath ? storage.ref(company.coverPath) : ''
  );
  return (
    <ItemContainer onMouseEnter={onMouseEnter}>
      <Link className="container-link" to={'/jobs/' + id}>
        <LogoContainer bgImg={coverUrl}>
          <StorageImg
            className="logo"
            alt={company.name}
            path={company.logoPath}
          />
        </LogoContainer>
        <JobInfo>
          <div>
            <JobName>{title}</JobName>
            <CategoriesContainer>
              <JobCategories categories={categories} size="small" />
            </CategoriesContainer>
            <Link className="company" to={`/companies/${company.slug}`}>
              {company.name}
            </Link>
            <ShortDescription>{company.shortDescription}</ShortDescription>
          </div>
        </JobInfo>
      </Link>
    </ItemContainer>
  );
};

export default JobListItemLarge;
