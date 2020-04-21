import _ from 'lodash';
import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import Tags from '../UI/Tags';

const JobCategories = ({
  categories,
  className = '',
  limit,
  size = 'medium'
}) => {
  const { jobCategories, jobCategoriesLoading } = useContext(AppContext);
  if (jobCategoriesLoading) {
    return false;
  }
  const renderCategories = _.filter(jobCategories, category => {
    return categories.indexOf(category.id) > -1;
  });
  return (
    <Tags
      className={className}
      tags={renderCategories}
      limit={limit}
      size={size}
    />
  );
};

export default JobCategories;
