import React, { useState } from 'react';
import SearchInput from '../UI/SearchInput';
import {
  Filter,
  FilterItem,
  FilterItemCustom,
  onFilterChange
} from '../UI/Filter';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const RequestContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Label = styled.p`
  font-family: Arial, sans-serif;
  color: rgba(19, 21, 22, 0.6);
  font-size: 14px;
  text-align: right;
`;

const RequestBtn = styled.button`
  font-family: Arial, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;

  background: #f35b1a;
  box-shadow: 0 0 4px rgba(243, 91, 26, 0.5);
  border: none;
  border-radius: 3px;

  padding: 15px 30px;
  margin-left: 15px;
`;

const noop = () => {};

const JobsFilter = ({
  onChange = noop,
  filteredCount,
  companies,
  categories
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const renderCategories = categories.reduce(categoriesToTree, []);

  function categoriesToTree(tree, category) {
    const node = {
      name: category.name,
      id: category.id
    };

    if (category.hasChildren && !category.parentID) {
      node.children = category.childrenById
        .map(childId => {
          const { id, hasChildren, childrenById, name } = categories.find(
            cat => cat.id === childId
          );
          return { id, hasChildren, childrenById, name };
        })
        .reduce(categoriesToTree, []);

      return [...tree, node];
    }

    if (!category.parentID) {
      return [...tree, node];
    }

    return tree;
  }

  const toggleChildren = (selectedIds, categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);

    if (!category) return selectedIds;

    let selectedChildren = [];
    if (category.hasChildren) {
      selectedChildren = category.childrenById.reduce(toggleChildren, []);
    }

    return [...selectedIds, ...selectedChildren, category.id];
  };

  const onCategoryChange = event => {
    // Before a category can be toggled, its children must be toggled as well,
    // if it has any
    const { value, checked } = event.target;
    const category = categories.find(cat => cat.id === value);
    let selectedWithChildren = [...selectedCategories];
    if (category && category.hasChildren && checked) {
      selectedWithChildren = selectedWithChildren.concat(
        category.childrenById.reduce(toggleChildren, [])
      );
    }

    if (category && category.hasChildren && !checked) {
      const childrenById = category.childrenById.reduce(toggleChildren, []);
      selectedWithChildren = selectedWithChildren.filter(
        item => !childrenById.includes(item)
      );
    }

    onFilterChange(selectedWithChildren, setSelectedCategories, filtered =>
      onChange({ categories: filtered })
    )(event);
  };

  const onCompanyChange = onFilterChange(
    selectedCompanies,
    setSelectedCompanies,
    companies => onChange({ companies })
  );

  const onTypeChange = onFilterChange(selectedTypes, setSelectedTypes, types =>
    onChange({ types })
  );

  let categoriesBtnLabel = 'Categories';
  if (selectedCategories.length) {
    categoriesBtnLabel += ` (${selectedCategories.length})`;
  }

  let companiesBtnLabel = 'Companies';
  if (selectedCompanies.length) {
    companiesBtnLabel += ` (${selectedCompanies.length})`;
  }

  return (
    <Filter>
      <FilterItem
        tree
        label={categoriesBtnLabel}
        title="Job Categories"
        items={renderCategories}
        selectedItems={selectedCategories}
        onChange={onCategoryChange}
      />

      <FilterItem
        label={companiesBtnLabel}
        title="Companies"
        items={companies}
        selectedItems={selectedCompanies}
        onChange={onCompanyChange}
      />

      <FilterItem
        label="Type"
        title="Job Type"
        items={[
          { name: 'Full Time', id: 'fullTime' },
          { name: 'Part Time', id: 'partTime' }
        ]}
        selectedItems={selectedTypes}
        onChange={onTypeChange}
      />

      <FilterItemCustom>
        <SearchInput
          placeholder="Search Jobs"
          name="filter"
          onChange={value => onChange({ search: value })}
        />
      </FilterItemCustom>

      <FilterItemCustom full>
        <RequestContainer>
          <Label>Want to post your available positions?</Label>
          <Link to="/request-job">
            <RequestBtn>Post Your Job!</RequestBtn>
          </Link>
        </RequestContainer>
      </FilterItemCustom>
    </Filter>
  );
};

export default JobsFilter;
