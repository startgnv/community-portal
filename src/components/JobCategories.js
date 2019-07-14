import _ from 'lodash';
import React from 'react';
import Tags from './Tags';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

const JobCategories = ({
  categories,
  className = '',
  limit,
  size = 'medium'
}) => {
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
  const renderCategories = _.filter(categoriesSrc, category => {
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
