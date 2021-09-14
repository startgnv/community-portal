import React, { useState, useContext } from 'react';
import AppContext from '../../AppContext';
import {
  Filter,
  FilterItem,
  FilterItemCustom,
  onFilterChange
} from '../UI/Filter';
import SearchInput from '../UI/SearchInput';
import styled from 'styled-components/macro';

const noop = () => {};

const Label = styled.p`
  font-family: Arial, sans-serif;
  color: rgba(19, 21, 22, 0.6);
  font-size: 14px;
  text-align: right;
`;

const EcosystemFilter = ({ onChange = noop, sizeList, filteredCount }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { ecosystemCategories, ecosystemCategoriesLoading } = useContext(
    AppContext
  );
  const [selectedTypes, setSelectedTypes] = useState([]);

  if (ecosystemCategoriesLoading) {
    return false;
  }

  const onCategoryChange = onFilterChange(
    selectedCategories,
    setSelectedCategories,
    categories => onChange({ categories })
  );

  const onTypeChange = onFilterChange(selectedTypes, setSelectedTypes, types =>
    onChange({ types })
  );

  let categoriesBtnLabel = 'Categories';
  if (selectedCategories.length) {
    categoriesBtnLabel += ` (${selectedCategories.length})`;
  }

  return (
    <Filter>
      <FilterItem
        label={categoriesBtnLabel}
        title="Categories"
        items={ecosystemCategories}
        selectedItems={selectedCategories}
        onChange={onCategoryChange}
      />
      <FilterItem
        label="Type"
        title="Ecosystem Type"
        items={[
          { name: 'Student', id: 'student' },
          { name: 'Entrepreneur', id: 'entrepreneur' },
          { name: 'Employee', id: 'employee' }
        ]}
        selectedItems={selectedTypes}
        onChange={onTypeChange}
      />
      <FilterItemCustom>
        <SearchInput
          placeholder="Search Ecosystem"
          name="filter"
          onChange={value => onChange({ search: value })}
        />
      </FilterItemCustom>
    </Filter>
  );
};

export default EcosystemFilter;
