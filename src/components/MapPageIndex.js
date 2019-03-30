import React, { useState } from 'react';
import CompanyList from './CompanyList';
import CompanyListItem from './CompanyListItem';

export const MapPageIndex = ({ companies = [] }) => {
  const [filterText, setFilterText] = useState('');

  const filteredCompanies = companies.filter(e =>
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
        {filteredCompanies.map(company => (
          <CompanyListItem company={company} key={company.id} />
        ))}
      </CompanyList>
    </div>
  );
};

export default MapPageIndex;
