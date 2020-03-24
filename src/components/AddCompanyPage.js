import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import PageContent from './PageContent';
import Button from './Button';

import { db } from '../firebase';

const Field = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const Description = styled.p`
  max-width: 520px;
`;

const AddCompanyPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyURL, setCompanyURL] = useState('');

  const onSubmit = ev => {
    ev.preventDefault();
    setLoading(true);
    db.collection('addCompanyResponses')
      .add({
        name,
        email,
        companyName,
        companyAddress,
        companyURL
      })
      .then(res => {
        setLoading(false);
        setSuccess(true);
      })
      .catch(err => {
        setLoading(false);
        console.warn(err);
      });
    return false;
  };

  let content;
  if (success) {
    content = <p>Success! We'll be in touch soon!</p>;
  } else if (loading) {
    content = <p>Submitting...</p>;
  } else {
    content = (
      <>
        <Description>
          If you think your company should be listed on this site we'd love to
          hear from you! Just fill out the form below and we'll get in touch!
        </Description>
        <form onSubmit={onSubmit}>
          <Field>
            <TextInput
              placeholder="Name"
              onChange={ev => setName(ev.target.value)}
              value={name}
            />
          </Field>
          <Field>
            <TextInput
              placeholder="Email Address"
              onChange={ev => setEmail(ev.target.value)}
              value={email}
            />
          </Field>
          <Field>
            <TextInput
              placeholder="Company Name"
              onChange={ev => setCompanyName(ev.target.value)}
              value={companyName}
            />
          </Field>
          <Field>
            <TextInput
              placeholder="Company Address"
              onChange={ev => setCompanyAddress(ev.target.value)}
              value={companyAddress}
            />
          </Field>
          <Field>
            <TextInput
              placeholder="Company URL"
              onChange={ev => setCompanyURL(ev.target.value)}
              value={companyURL}
            />
          </Field>
          <Button label="Submit" type="submit" />
        </form>
      </>
    );
  }

  return (
    <PageContent>
      <Title>Add a company</Title>
      {content}
    </PageContent>
  );
};

export default AddCompanyPage;
