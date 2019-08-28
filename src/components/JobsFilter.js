import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { clearFix } from 'polished';
import Checkbox from './Checkbox';
import Button from './Button';
import TextInput from './TextInput';

const JobsFilterContainer = styled.div`
  text-align: right;
  clear: both;
  padding: 20px;
  background: ${({ theme }) => theme.uiBackground};
  border-radius: 6px;

  .filter-label {
    display: inline-block;
    height: 30px;
    margin-right: 10px;
    line-height: 30px;
  }
`;

const FilterItem = styled.div`
  display: inline-block;
  margin-right: 10px;
`;

const CategoriesContainer = styled.div`
  ${clearFix()}
  text-align: left;
`;

const GroupTitle = styled.h3``;

const FilterControls = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

const CheckContainer = styled.div`
  float: left;
`;

const noop = () => {};

const JobsFilter = ({ onChange = noop, filter }) => {
  const [controlsOpen, setControlsOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(['fullTime', 'partTime']);
  const [searchString, setSearchString] = useState('');
  const [categoriesValue, categoriesLoading, categoriesError] = useCollection(
    db.collection('jobCategories')
  );
  if (categoriesLoading || categoriesError) {
    return false;
  }
  const categoriesSrc = categoriesValue.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  const renderCategories = _.filter(
    categoriesSrc,
    category => !category.parentID
  );

  const onCategoryChange = ({ target: { checked, value } }) => {
    let newCategories;
    if (checked) {
      newCategories = _.concat(selectedCategories, value);
    } else {
      newCategories = _.without(selectedCategories, value);
    }
    setSelectedCategories(newCategories);
    onChange({
      categories: newCategories
    });
  };

  const onTypeChange = ({ target: { checked, value } }) => {
    let newTypes;
    if (checked) {
      newTypes = _.concat(selectedTypes, value);
    } else {
      newTypes = _.without(selectedTypes, value);
    }
    setSelectedTypes(newTypes);
    onChange({
      type: newTypes
    });
  };

  const onSearchChange = ({ target: { value } }) => {
    onChange({
      search: value
    });
  };

  return (
    <JobsFilterContainer>
      <FilterControls open={controlsOpen}>
        <TextInput
          placeholder="Filter Jobs"
          name="filter"
          onChange={onSearchChange}
        />
        <CategoriesContainer>
          <GroupTitle>Categories</GroupTitle>
          {renderCategories.map(({ name, id }) => (
            <CheckContainer>
              <Checkbox
                label={name}
                value={id}
                onChange={onCategoryChange}
                checked={selectedCategories.indexOf(id) > -1}
                key={id}
              />
            </CheckContainer>
          ))}
        </CategoriesContainer>
        <CategoriesContainer>
          <GroupTitle>Type</GroupTitle>
          <CheckContainer>
            <Checkbox
              label="Full Time"
              value="fullTime"
              onChange={onTypeChange}
              checked={selectedTypes.indexOf('fullTime') > -1}
            />
          </CheckContainer>
          <CheckContainer>
            <Checkbox
              label="Part Time"
              value="partTime"
              onChange={onTypeChange}
              checked={selectedTypes.indexOf('partTime') > -1}
            />
          </CheckContainer>
        </CategoriesContainer>
      </FilterControls>
    </JobsFilterContainer>
  );
};

export default JobsFilter;
