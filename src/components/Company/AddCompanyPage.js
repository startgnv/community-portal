import React, { useState } from 'react';
import styled from 'styled-components';
import PageContent from '../PageContent';
import Button from '../Button';
import { validate } from 'email-validator';
import { db } from '../../firebase';
import ValidatorInput from '../UI/ValidatorInput';

const Field = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const Description = styled.p`
  max-width: 520px;
`;

const Input = styled(ValidatorInput)`
  display: block;
  width: 200px;
  height: 40px;
  padding: 0 15px;
  border: 0;
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.uiBorder};
  box-sizing: border-box;
  border-radius: 3px;
`;

const AddCompanyPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');

  const [companyAddress, setCompanyAddress] = useState('');
  const [companyAddressError, setCompanyAddressError] = useState('');

  const [companyURL, setCompanyURL] = useState('');
  const [companyURLError, setCompanyURLError] = useState('');

  const validateRequired = (field, setError) => () => {
    if (field.length < 1) {
      setError('Required');
      return false;
    }
    setError('');
    return true;
  };

  const validateEmail = (e, setError) => () => {
    if (!validate(e)) {
      setError('Please enter a valid email');
      return false;
    }
    setError('');
    return true;
  };

  const validators = [
    validateRequired(name, setNameError),
    validateRequired(email, setEmailError),
    validateEmail(email, setEmailError),
    validateRequired(companyName, setCompanyNameError),
    validateRequired(companyAddress, setCompanyAddressError)
  ];

  const onSubmit = ev => {
    ev.preventDefault();

    const valid = validators.map(v => v()).reduce((acc, v) => acc && v, true);

    if (valid) {
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
    }
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
            <Input
              placeholder="Name"
              onChange={setName}
              value={name}
              error={nameError}
            />
          </Field>
          <Field>
            <Input
              placeholder="Email Address"
              onChange={setEmail}
              value={email}
              error={emailError}
            />
          </Field>
          <Field>
            <Input
              placeholder="Company Name"
              onChange={setCompanyName}
              value={companyName}
              error={companyNameError}
            />
          </Field>
          <Field>
            <Input
              placeholder="Company Address"
              onChange={setCompanyAddress}
              value={companyAddress}
              error={companyAddressError}
            />
          </Field>
          <Field>
            <Input
              placeholder="Company URL"
              onChange={setCompanyURL}
              value={companyURL}
              error={companyURLError}
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
