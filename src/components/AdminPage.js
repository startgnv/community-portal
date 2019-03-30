import React from 'react';
import { Link } from 'react-router-dom';
import { NewCompanyForm } from './NewCompanyForm';

export const AdminPage = ({ onUpdate = () => {}, companies = [] }) => {
  const onSubmit = company => {
    onUpdate([...companies, company]);
  };

  return (
    <div>
      <NewCompanyForm onSubmit={onSubmit} />
      <ul>
        {companies.map(({ name, latitude, longitude }) => (
          <li key={name}>
            <Link to={`/admin/companies/${name}`}>{name}</Link>{' '}
            {`-${latitude}-${longitude}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
