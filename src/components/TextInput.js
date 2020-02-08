import React from 'react';
import styled from 'styled-components/macro';

const TextInputContainer = styled.div`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '200px')};

  .input {
    display: block;
    width: 100%;
    height: 40px;
    padding: 0 15px;
    border: 0;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.uiBorder};
    box-sizing: border-box;
    border-radius: 3px;
  }
`;

export const TextInput = ({
  label = '',
  className,
  fullWidth = false,
  name = '',
  placeholder = '',
  onChange = () => {},
  inputProps = {},
  value = ''
}) => {
  return (
    <TextInputContainer className={className} fullWidth={fullWidth} name={name}>
      {label && <span className="label">{label}</span>}
      <input
        className="input"
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...inputProps}
      />
    </TextInputContainer>
  );
};

export default TextInput;
