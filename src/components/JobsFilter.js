import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { clearFix } from 'polished';
import Checkbox from './Checkbox';
import TextInput from './TextInput';
import Dropdown from './Dropdown';

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

const CategoriesDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.uiBorder};
  margin: 5px 0;
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
  const renderSelectedCategories = _.filter(
    categoriesSrc,
    category =>
      !category.parentID && selectedCategories.indexOf(category.id) > -1
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
          <Dropdown btnLabel={categoriesBtnLabel}>
            <CategoriesContainer>
              {renderSelectedCategories.map(({ name, id }) => (
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
              {renderSelectedCategories &&
                renderSelectedCategories.length > 0 && <CategoriesDivider />}
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
          </Dropdown>
        </FilterItem>
        <FilterItem>
          <Dropdown btnLabel="Type">
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
          </Dropdown>
        </FilterItem>
        <FilterItem>
          <TextInput
            placeholder="Search Jobs"
            name="filter"
            onChange={onSearchChange}
          />
        </FilterItem>
      </FilterControls>
    </JobsFilterContainer>
  );
};

export default JobsFilter;
