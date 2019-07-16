import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
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

const noop = () => {};

const JobsFilter = ({ onChange = noop, filter }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
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
      search: '',
      categories: newCategories
    });
  };

  return (
    <JobsFilterContainer>
      <span className="filter-label">Filter:</span>
      <FilterItem>
        <Button label="Categories" style="outline" />
      </FilterItem>
      <FilterItem>
        <Button label="Experience Level" style="outline" />
      </FilterItem>
      <FilterItem>
        <Button label="Full / Part Time" style="outline" />
      </FilterItem>
      <div className="categories">
        {renderCategories.map(({ name, id }) => (
          <Checkbox
            label={name}
            value={id}
            onChange={onCategoryChange}
            checked={selectedCategories.indexOf(id) > -1}
            key={id}
          />
        ))}
      </div>
    </JobsFilterContainer>
  );
};

export default JobsFilter;
