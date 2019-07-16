import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { clearFix } from 'polished';
import Checkbox from './Checkbox';
import Button from './Button';

const JobsFilterContainer = styled.div`
  text-align: right;
  clear: both;

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
  const [controlsOpen, setControlsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState(['fullTime', 'partTime']);
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

  const onTimeChange = ({ target: { checked, value } }) => {
    let newTimes;
    if (checked) {
      newTimes = _.concat(selectedTimes, value);
    } else {
      newTimes = _.without(selectedTimes, value);
    }
    setSelectedTimes(newTimes);
    onChange({
      times: newTimes
    });
  };

  return (
    <JobsFilterContainer>
      <FilterItem>
        <Button
          label={controlsOpen ? 'Close Filter' : 'Open Filter'}
          style="outline"
          onClick={() => setControlsOpen(!controlsOpen)}
        />
      </FilterItem>
      <FilterControls open={controlsOpen}>
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
              onChange={onTimeChange}
              checked={selectedTimes.indexOf('fullTime') > -1}
            />
          </CheckContainer>
          <CheckContainer>
            <Checkbox
              label="Part Time"
              value="partTime"
              onChange={onTimeChange}
              checked={selectedTimes.indexOf('partTime') > -1}
            />
          </CheckContainer>
        </CategoriesContainer>
      </FilterControls>
    </JobsFilterContainer>
  );
};

export default JobsFilter;
