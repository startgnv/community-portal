import React, { useState } from 'react';
import styled from 'styled-components';
import PageContainer from '../UI/PageContainer';
import Button from '../UI/Button';
import { db } from '../../../firebase';
import ValidatorInput from '../UI/validation/ValidatorInput';
import { validate, Validators } from '../UI/validation/useValidation';

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
  const [companyURLError] = useState('');

  const validators = [
    [name, setNameError, Validators.required],
    [email, setEmailError, Validators.required, Validators.email],
    [companyName, setCompanyNameError, Validators.required],
    [companyAddress, setCompanyAddressError, Validators.required]
  ];

  const onSubmit = ev => {
    ev.preventDefault();

    const valid = validate(validators);

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
    <PageContainer>
      <Title>Add a company</Title>
      {content}
    </PageContainer>
  );
};

export default AddCompanyPage;
