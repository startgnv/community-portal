import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import {
  Filter,
  FilterItem,
  FilterItemCustom,
  onFilterChange
} from '../UI/Filter';
import styled from 'styled-components/macro';

const noop = () => {};

const Label = styled.p`
  font-family: Arial, sans-serif;
  color: rgba(19, 21, 22, 0.6);
  font-size: 14px;
  text-align: right;
`;

const CompaniesFilter = ({ onChange = noop, sizeList, filteredCount }) => {
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [industriesValue, industriesLoading, industriesError] = useCollection(
    db.collection('companyCategories')
  );

  if (industriesLoading || industriesError) {
    return false;
  }
  const industriesSrc = industriesValue.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const onIndustryChange = onFilterChange(
    selectedIndustries,
    setSelectedIndustries,
    industries => onChange({ industries })
  );

  const onSizeChange = onFilterChange(selectedSizes, setSelectedSizes, sizes =>
    onChange({ sizes })
  );

  let industriesBtnLabel = 'Industries';
  if (selectedIndustries.length) {
    industriesBtnLabel += ` (${selectedIndustries.length})`;
  }

  return (
    <Filter>
      <FilterItem
        label={industriesBtnLabel}
        title="Company Industries"
        items={industriesSrc}
        selectedItems={selectedIndustries}
        onChange={onIndustryChange}
      />

      <FilterItem
        label="Size"
        title="Number of Employees"
        items={sizeList.map(size => ({ name: size, id: size }))}
        selectedItems={selectedSizes}
        onChange={onSizeChange}
      />

      <FilterItemCustom full>
        <Label>
          {filteredCount} {filteredCount !== 1 ? 'Companies' : 'Company'}
        </Label>
      </FilterItemCustom>
    </Filter>
  );
};

export default CompaniesFilter;
