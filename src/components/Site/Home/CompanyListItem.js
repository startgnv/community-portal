import React, { useContext } from 'react';
import { storage } from '../../../firebase';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { clearFix } from 'polished';
import AppContext from '../../AppContext';
import StorageImg from '../UI/StorageImg';

const CompanyListItemContainer = styled.li`
  list-style-type: none;

  .link-container {
    display: block;
    text-decoration: none;
    box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
    background: white;
    transition: 200ms;
    cursor: pointer;
    ${clearFix()}

    &:hover {
      box-shadow: 3px 3px 13px 0 rgba(0, 0, 0, 0.15);
      transform: scale(1.04);
      transform-origin: center;
    }
  }

  .company-img {
    display: block;
    width: 40px;
    height: 40px;
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

const CompanyInfo = styled.div`
  display: flex;
  height: 70px;
  padding: 15px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  text-align: left;
`;

const CompanyTitle = styled.span`
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

const IndustryTitle = styled.span`
  font-size: 13px;
  line-height: 16px;
  color: #333;
  text-decoration: none;
`;

export const CompanyListItem = ({
  company: {
    id,
    name = 'No Name',
    logoPath = '',
    coverPath = '',
    slug = '',
    industryID
  } = {}
}) => {
  const [coverUrl] = useDownloadURL(coverPath ? storage.ref(coverPath) : '');
  const { companyCategories } = useContext(AppContext);
  const category = companyCategories.find(cat => cat.id === industryID) || {};
  return (
    <CompanyListItemContainer>
      <Link className="link-container" to={`/companies/${slug}`}>
        <Images>
          <CompanyCover coverImg={coverUrl} />
          <StorageImg className="company-img" alt={`${name}`} path={logoPath} />
        </Images>
        <CompanyInfo>
          <CompanyTitle>{name}</CompanyTitle>
          <IndustryTitle>{category.name}</IndustryTitle>
        </CompanyInfo>
      </Link>
    </CompanyListItemContainer>
  );
};

export default CompanyListItem;
