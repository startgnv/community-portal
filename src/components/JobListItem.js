import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import feathrLogo from '../assets/images/companyLogos/feathr.png';
import exactechLogo from '../assets/images/companyLogos/exactech.png';
import admiralLogo from '../assets/images/companyLogos/admiral.png';
import infotechLogo from '../assets/images/companyLogos/infotech.png';
import ieLogo from '../assets/images/companyLogos/infinite-energy.png';
const companyLogos = {
  feathr: feathrLogo,
  exactech: exactechLogo,
  admiral: admiralLogo,
  'info-tech': infotechLogo,
  'infinite-energy': ieLogo
};

const JobListItemContainer = styled.li`
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

  .title {
    display: block;
    font-size: 16px;
    color: #333;
    text-decoration: none;
    line-height: 24px;
  }

  .company {
    display: inline-block;
    margin-bottom: 5px;
    font-size: 13px;
    line-height: 18px;
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .tags {
    margin: 0 0 10px;
    padding: 0;
    list-style: none;
  }

  .tag {
    display: inline-block;
    height: 20px;
    padding: 0 10px;
    margin-right: 5px;
    background-color: #666;
    line-height: 20px;
    border-radius: 3px;
    color: white;
    font-size: 11px;

    &:last-child {
      margin: 0;
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

export const JobListItem = ({
  job: { id, title = 'No Title', description = 'No Description' } = {},
  categories = [],
  company = {},
  showLogo = true
}) => (
  <JobListItemContainer>
    {showLogo && (
      <img
        className="company-img"
        src={companyLogos[company.slug] || feathrLogo}
      />
    )}
    <div className="info">
      <Link className="title" to={`/job/${id}`}>
        {title}
      </Link>
      <div>
        <Link className="company" to={`/company/${company.slug}`}>
          {company.name}
        </Link>
      </div>
      {categories.length > 0 && (
        <ul className="tags">
          {categories.map(category => (
            <li className="tag" key={category.id}>
              {category.name}
            </li>
          ))}
        </ul>
      )}
      <p className="description">{description}</p>
    </div>
  </JobListItemContainer>
);

export default JobListItem;
