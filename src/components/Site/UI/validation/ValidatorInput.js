import React from 'react';
import styled from 'styled-components/macro';

const Input = styled.input`
  ${({ error }) =>
    error &&
    `
      border: 1px solid #ff3333 !important;
      margin-top: 0 !important;
    `}
  ${({ submitted }) =>
    submitted &&
    `
    border: 1px solid #00e171 !important;
    margin-top: 0 !important;
  `}
`;

const ErrorLabel = styled.label`
  color: #ff3333;
  font-size: 10px;
  font-family: Arial, sans-serif;
  margin-top: 20px;
  margin-bottom: 3px;
  align-self: flex-start;
`;

const SubmitLabel = styled.label`
  color: #00e171;
  font-size: 10px;
  font-family: Arial, sans-serif;
  margin-top: 20px;
  margin-bottom: 3px;
  align-self: flex-start;
`;

const ValidatorInput = ({
  submitted,
  error,
  onChange,
  value,
  className,
  placeholder,
  successMessage
}) => {
  return (
    <>
      {error && <ErrorLabel>{error}</ErrorLabel>}
      {submitted && <SubmitLabel>{successMessage}</SubmitLabel>}
      <Input
        className={className}
        disabled={submitted}
        submitted={submitted}
        error={error}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </>
  );
};

export default ValidatorInput;
