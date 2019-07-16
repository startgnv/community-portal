import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Popper from '@material-ui/core/Popper';
import Checkbox from './Checkbox';
import Button from './Button';

const JobsFilterContainer = styled.div`
  padding: 10px 20px;
  text-align: right;

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
  background-color: white;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.15);
`;

const noop = () => {};

const JobsFilter = ({ onChange = noop, filter }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [catAnchorEl, setCatAnchorEl] = useState(null);
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

  const onClickCategoriesBtn = event => {
    setCatAnchorEl(catAnchorEl ? null : event.currentTarget);
  };

  const catOpen = Boolean(catAnchorEl);
  const catPopId = catOpen ? 'cat-popper' : undefined;

  const onCategoryChange = ({ target: { checked, value } }) => {
    let newCategories;
    if (checked) {
      newCategories = _.concat(selectedCategories, value);
    } else {
      newCategories = _.without(selectedCategories, value);
    }
    setSelectedCategories(newCategories);
    onChange({
      search: '',
      categories: newCategories
    });
  };

  return (
    <JobsFilterContainer>
      <span className="filter-label">Filter:</span>
      <FilterItem>
        <Button
          label="Categories"
          style="outline"
          onClick={onClickCategoriesBtn}
        />
      </FilterItem>
      <FilterItem>
        <Button label="Experience Level" style="outline" />
      </FilterItem>
      <FilterItem>
        <Button label="Full / Part Time" style="outline" />
      </FilterItem>
      <Popper id={catPopId} open={catOpen} anchorEl={catAnchorEl} transition>
        <CategoriesContainer>
          {renderCategories.map(({ name, id }) => (
            <Checkbox
              label={name}
              value={id}
              onChange={onCategoryChange}
              checked={selectedCategories.indexOf(id) > -1}
              key={id}
            />
          ))}
        </CategoriesContainer>
      </Popper>
    </JobsFilterContainer>
  );
};

export default JobsFilter;
