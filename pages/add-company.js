import React, { useState } from 'react';
import styled from 'styled-components';
import PageContainer from '../src/components/Site/UI/PageContainer';
import Button from '../src/components/Site/UI/Button';
import { db } from '../src/firebase';
import ValidatorInput from '../src/components/Site/UI/validation/ValidatorInput';
import { validate, Validators } from '../src/components/Site/UI/validation/useValidation';
import ValidatorSelect from '../src/components/Site/UI/validation/ValidatorSelect';
import FieldRow from '../src/components/Site/UI/Form/FieldRow';
import Field from '../src/components/Site/UI/Form/Field';

const Title = styled.h3`
  margin-bottom: 10px;
`;

const Description = styled.p`
  max-width: 520px;
`;

const Input = styled(ValidatorInput)`
  display: block;
  height: 40px;
  padding: 12px 15px;
  border: 0;
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.uiBorder};
  box-sizing: border-box;
  border-radius: 3px;
  width: 100%;
  font-family: WilliamsCaslonText, serif;
  resize: vertical;
`;

const Select = styled(ValidatorSelect)`
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 15px;
  border: 0;
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.uiBorder};
  box-sizing: border-box;
  border-radius: 3px;
  flex: 1;

  // Removes the default arrow icon
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  // Sets a custom arrow icon
  background-image: url('/assets/images/dropdown-arrow.svg'),
    linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.9em top 50%, 0 0;
  background-size: 12px auto, 100%;
`;

const AddCompanyPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [yearFounded, setYearFounded] = useState('');
  const [yearFoundedError, setYearFoundedError] = useState('');

  const [employeeCount, setEmployeeCount] = useState('<10');
  const [employeeCountError, setEmployeeCountError] = useState('');

  const [description, setDescription] = useState('');
  const [descriptionError] = useState('');

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
        .then(() => {
          return db.collection('companyDrafts').add({
            address: companyAddress,
            description,
            employeeCount,
            founded: yearFounded,
            name: companyName,
            slug: companyName
              .split(' ')
              .join('-')
              .toLowerCase(),
            url: companyURL
          });
        })
        .then(() => {
          setLoading(false);
          setSuccess(true);
        })
        .catch(err => {
          setLoading(false);
          console.error(err);
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
          <FieldRow>
            <Field>
              <Input
                placeholder="Your Name"
                onChange={setName}
                value={name}
                error={nameError}
              />
            </Field>
            <Field>
              <Input
                placeholder="Contact Email Address"
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
                placeholder="Company Local Address"
                onChange={setCompanyAddress}
                value={companyAddress}
                error={companyAddressError}
              />
            </Field>
          </FieldRow>
          <FieldRow>
            <Field>
              <Input
                placeholder="Company URL"
                onChange={setCompanyURL}
                value={companyURL}
                error={companyURLError}
              />
            </Field>
            <Field>
              <Input
                placeholder="Year Founded"
                onChange={setYearFounded}
                value={yearFounded}
                error={yearFoundedError}
              />
            </Field>
            <Field>
              <Select
                placeholder="Number of Employees"
                onChange={setEmployeeCount}
                value={employeeCount}
                error={employeeCountError}
              >
                <option value="<10">&lt;10 Employees</option>
                <option value="10-50">10-50 Employees</option>
                <option value="50-100">50-100 Employees</option>
                <option value="100-500">100-500 Employees</option>
                <option value="500+">500+ Employees</option>
              </Select>
            </Field>
          </FieldRow>
          <Field>
            <Input
              type="textarea"
              placeholder="Description"
              onChange={setDescription}
              value={description}
              error={descriptionError}
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
