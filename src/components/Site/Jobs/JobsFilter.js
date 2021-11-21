import React, { useState } from 'react';
import SearchInput from '../UI/SearchInput';
import {
  Filter,
  FilterItem,
  FilterItemCustom,
  onFilterChange
} from '../UI/Filter';
import RequestButton from '../UI/RequestButton';

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
  const [selectedExperiences, setSelectedExperiences] = useState([]);

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

  const onExperienceChange = onFilterChange(
    selectedExperiences,
    setSelectedExperiences,
    experiences => onChange({ experiences })
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
          { name: 'Part Time', id: 'partTime' },
          { name: 'Internship', id: 'internship' },
          { name: 'Contract', id: 'contract' },
          { name: 'Remote', id: 'remote' }
        ]}
        selectedItems={selectedTypes}
        onChange={onTypeChange}
      />

      <FilterItem
        label="Experience"
        title="Experience Type"
        items={[
          { name: 'Entry Level', id: 'entryLevel' },
          { name: 'Mid Level', id: 'midLevel' },
          { name: 'Senior Level', id: 'seniorLevel' }
        ]}
        selectedItems={selectedExperiences}
        onChange={onExperienceChange}
      />

      <FilterItemCustom>
        <SearchInput
          placeholder="Search Jobs"
          name="filter"
          onChange={value => onChange({ search: value })}
        />
      </FilterItemCustom>

      <FilterItemCustom full>
        <RequestButton to="/request-job">Post Your Job!</RequestButton>
      </FilterItemCustom>
    </Filter>
  );
};

export default JobsFilter;
