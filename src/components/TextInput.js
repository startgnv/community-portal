import React from 'react';
import styled from 'styled-components/macro';
import { darken } from 'polished';

const TextInputContainer = styled.div`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '200px')};

  .input {
    display: block;
    width: 100%;
    height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
  }
`;

export const TextInput = ({
  label = '',
  className,
  fullWidth = false,
  name = '',
  placeholder = '',
  onChange = () => {}
}) => {
  return (
    <TextInputContainer
      className={className}
      fullWidth={fullWidth}
      placeholder={placeholder}
      name={name}
    >
      {label && <span className="label">{label}</span>}
      <input
        className="input"
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </TextInputContainer>
  );
};

export default TextInput;
