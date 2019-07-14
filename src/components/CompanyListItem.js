import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const CompanyListItemContainer = styled.li`
  display: flex;
  padding: 10px 10px 10px 13px;
  list-style-type: none;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: 250ms;

  &:hover {
    background-color: #eee;
    cursor: pointer;
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

  .name {
    display: block;
    font-size: 16px;
    color: #333;
    text-decoration: none;
    line-height: 24px;
  }
`;

export const CompanyListItem = ({
  company: { name, slug = '', logoImg = '' } = {},
  company,
  showLogo = true
}) => (
  <CompanyListItemContainer>
    {showLogo && <img className="company-img" src={logoImg} />}
    <div className="info">
      <Link className="name" to={`/company/${slug}`}>
        {name}
      </Link>
    </div>
  </CompanyListItemContainer>
);

export default CompanyListItem;
