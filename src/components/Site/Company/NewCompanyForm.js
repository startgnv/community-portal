import React from 'react';
import styled from 'styled-components';
import ValidatorInput from '../UI/validation/ValidatorInput';
import ValidatorSelect from '../UI/validation/ValidatorSelect';
import dropdownArrow from '../../../assets/images/dropdown-arrow.svg';
import FieldRow from '../UI/Form/FieldRow';
import Field from '../UI/Form/Field';

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
  background-image: url(${dropdownArrow}),
    linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.9em top 50%, 0 0;
  background-size: 12px auto, 100%;
`;

const NewCompanyForm = ({
  companyAddress,
  setCompanyAddress,
  companyAddressError,
  companyUrl,
  setCompanyUrl,
  companyUrlError,
  companyYearFounded,
  setCompanyYearFounded,
  companyYearFoundedError,
  companyEmployeeCount,
  setCompanyEmployeeCount,
  companyEmployeeCountError,
  companyDescription,
  setCompanyDescription,
  companyDescriptionError
}) => {
  return (
    <>
      <FieldRow>
        <Field>
          <Input
            testId="field-company-address"
            placeholder="Company Address"
            onChange={setCompanyAddress}
            value={companyAddress}
            error={companyAddressError}
          />
        </Field>
        <Field>
          <Input
            placeholder="Company Website URL"
            onChange={setCompanyUrl}
            value={companyUrl}
            error={companyUrlError}
          />
        </Field>
        <Field>
          <Input
            placeholder="Company Founding Year"
            onChange={setCompanyYearFounded}
            value={companyYearFounded}
            error={companyYearFoundedError}
          />
        </Field>
        <Field>
          <Select
            placeholder="Number of Employees"
            onChange={setCompanyEmployeeCount}
            value={companyEmployeeCount}
            error={companyEmployeeCountError}
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
          placeholder="Company Description"
          onChange={setCompanyDescription}
          value={companyDescription}
          error={companyDescriptionError}
        />
      </Field>
    </>
  );
};

export default NewCompanyForm;
