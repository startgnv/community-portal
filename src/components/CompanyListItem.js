import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const CompanyListItemContainer = styled.li`
  list-style-type: none;

  .link-container {
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

  .name {
    display: block;
    font-size: 16px;
    color: #333;
    line-height: 24px;
  }
`;

export const CompanyListItem = ({
  company: { name, slug = '', logoImg = '' } = {},
  company,
  showLogo = true
}) => (
  <CompanyListItemContainer>
    <Link className="link-container" to={`/company/${slug}`}>
      {showLogo && <img className="company-img" alt={name} src={logoImg} />}
      <div className="info">
        <span className="name">{name}</span>
      </div>
    </Link>
  </CompanyListItemContainer>
);

export default CompanyListItem;
