import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { firestore } from 'firebase/app';
import { NewCompanyForm } from './NewCompanyForm';
import { NewJobForm } from './NewJobForm';
import { useCollection } from 'react-firebase-hooks/firestore';

export const AdminIndex = () => {
  const {
    loading: companiesLoading,
    error: companiesError,
    value: companies
  } = useCollection(db.collection('companies'));
  const { loading: jobsLoading, error: jobsError, value: jobs } = useCollection(
    db.collection('jobs')
  );
  let companiesList;
  if (companiesLoading) {
    companiesList = <span>Loading Companies...</span>;
  } else if (companiesError) {
    companiesList = <span>ERROR Loading Companies</span>;
  } else {
    companiesList = (
      <ul>
        {companies.docs.map(doc => {
          const {
            name,
            coordinates: { latitude, longitude } = {}
          } = doc.data();
          return (
            <li key={doc.id}>
              <Link to={`/admin/companies/${doc.id}`}>{name}</Link>
              {`-${latitude}-${longitude}`}
            </li>
          );
        })}
      </ul>
    );
  }
  let jobsList;
  if (jobsLoading || companiesLoading) {
    jobsList = <span>Loading Jobs...</span>;
  } else if (jobsError) {
    jobsList = <span>ERROR Loading Jobs</span>;
  } else {
    jobsList = (
      <ul>
        {jobs.docs.map(doc => {
          const { title, companyID } = doc.data();
          return (
            <li key={doc.id}>
              <Link to={`/admin/jobs/${title}`}>{title}</Link> - {companyID}
            </li>
          );
        })}
      </ul>
    );
  }
  const onNewCompanySubmit = ({ name, latitude, longitude }) => {
    db.collection('companies').add({
      name,
      coordinates: new firestore.GeoPoint(latitude, longitude)
    });
  };
  const onNewJobSubmit = ({ title, description, companyID, applyUrl }) => {
    db.collection('jobs').add({
      title,
      description,
      companyID,
      applyUrl
    });
  };
  return (
    <div>
      <h3>Create Company</h3>
      <NewCompanyForm onSubmit={onNewCompanySubmit} />

      <h3>Create Job</h3>
      {companies && companies.docs && (
        <NewJobForm onSubmit={onNewJobSubmit} companies={companies.docs} />
      )}

      <h3>Companies</h3>
      {companiesList}

      <h3>Jobs</h3>
      {jobsList}
    </div>
  );
};
