import React, { useState } from 'react';
export const NewJobForm = ({
  companies = [],
  onSubmit = () => {},
  jobCategories = []
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyID, setCompanyID] = useState('');
  const [applyUrl, setApplyUrl] = useState('');
  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit({ title, description, companyID, applyUrl });
    setTitle('');
    setDescription('');
    setCompanyID('');
    setApplyUrl('');
  };
  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Job Title"
      />
      <textarea
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      >
        {description}
      </textarea>
      <select value={companyID} onChange={e => setCompanyID(e.target.value)}>
        <option value="">Select Company</option>
        {companies.map(company => {
          const { name } = company.data();
          return <option value={company.id}>{name}</option>;
        })}
      </select>
      <input
        type="text"
        value={applyUrl}
        onChange={e => setApplyUrl(e.target.value)}
        placeholder="Application URL"
      />

      <button type="submit">Submit</button>
    </form>
  );
};
