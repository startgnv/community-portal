import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { Filter, FilterItem, onFilterChange } from '../UI/Filter';

const noop = () => {};

const CompaniesFilter = ({ onChange = noop, sizeList }) => {
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
    </Filter>
  );
};

export default CompaniesFilter;
