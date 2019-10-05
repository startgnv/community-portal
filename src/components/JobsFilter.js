import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Popper } from '@material-ui/core';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { clearFix } from 'polished';
import Checkbox from './Checkbox';
import Button from './Button';
import TextInput from './TextInput';
import Fade from '@material-ui/core/Fade';

const JobsFilterContainer = styled.div`
  margin-bottom: 30px;
  text-align: left;
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
  width: 260px;
  max-height: 260px;
  text-align: left;
  background: white;
  overflow: auto;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  ${clearFix()}
`;

const FilterControls = styled.div``;

const CheckContainer = styled.div``;

const noop = () => {};

const JobsFilter = ({ onChange = noop, filter }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [categoriesValue, categoriesLoading, categoriesError] = useCollection(
    db.collection('jobCategories')
  );
  const [categoriesAnchorEl, setCategoriesAnchorEl] = useState(null);
  const onCategoriesBtnClick = ev => {
    setCategoriesAnchorEl(categoriesAnchorEl ? null : ev.currentTarget);
  };
  const categoriesOpen = Boolean(categoriesAnchorEl);
  const cateogiresElID = categoriesOpen ? 'categories-popper' : undefined;
  const [typeAnchorEl, setTypeAnchorEl] = useState(null);
  const onTypeBtnClick = ev => {
    setTypeAnchorEl(typeAnchorEl ? null : ev.currentTarget);
  };
  const typeOpen = Boolean(typeAnchorEl);
  const typeElID = typeOpen ? 'type-popper' : undefined;
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

  let categoriesBtnLabel = 'Categories';
  if (selectedCategories.length) {
    categoriesBtnLabel += ` (${selectedCategories.length})`;
  }

  return (
    <JobsFilterContainer>
      <FilterControls>
        <FilterItem>
          <Button
            label={categoriesBtnLabel}
            variant="outline"
            aria-describedby={cateogiresElID}
            onClick={onCategoriesBtnClick}
          />
          <Popper
            id={cateogiresElID}
            open={categoriesOpen}
            anchorEl={categoriesAnchorEl}
            placement="bottom-start"
            transition
          >
            {({ TransitionProps }) => (
              <CategoriesContainer>
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
            )}
          </Popper>
        </FilterItem>
        <FilterItem>
          <Button
            label="Type"
            variant="outline"
            aria-describedby={typeElID}
            onClick={onTypeBtnClick}
          />
          <Popper
            id={typeElID}
            open={typeOpen}
            anchorEl={typeAnchorEl}
            placement="bottom-start"
            transition
          >
            {({ TransitionProps }) => (
              <CategoriesContainer>
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
            )}
          </Popper>
        </FilterItem>
        <FilterItem>
          <TextInput
            placeholder="Filter Jobs"
            name="filter"
            onChange={onSearchChange}
          />
        </FilterItem>
      </FilterControls>
    </JobsFilterContainer>
  );
};

export default JobsFilter;
