import React, { useState } from 'react';
import CompanyList from './CompanyList';
import CompanyListItem from './CompanyListItem';
export const MapPageIndex = ({ onFocusChange = () => {}, companies = [] }) => {
  const [filterText, setFilterText] = useState('');
  const filteredStartups = companies.filter(e =>
    e.name.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <div>
      <input
        type="text"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
      />
      <CompanyList
        css={`
          max-width: 50%;
        `}
      >
        {filteredStartups.map(company => (
          <CompanyListItem
            company={company}
            onHover={() => onFocusChange(company)}
            key={company.name}
          />
        ))}
      </CompanyList>
    </div>
  );
};
