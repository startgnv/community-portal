import React from 'react';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';

const CheckContainer = styled.div`
  position: relative;
  display: block;
  width: 20px;
  height: 20px;
  top: 50%;
  margin: -10px 10px 0 0;
  float: left;
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.uiBorder};
  border-radius: 2px;
  transition: 250ms;
  box-sizing: border-box;

  .icon {
    display: none;
    width: 20px;
    height: 20px;
    color: @white;
    line-height: 20px;
    text-align: center;
  }
`;

const CheckboxContainer = styled.label`
  display: block;
  height: 40px;
  margin: 0 10px 0 0;
  padding: 0 10px;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.uiBackground};

    ${CheckContainer} {
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.textLight};
    }
  }
`;

const FieldLabel = styled.span`
  display: block;
  margin: 0;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-size: 13px;
`;

const CheckInput = styled.input`
  display: none;

  &:checked {
    ~ ${CheckContainer} {
      background: ${({ theme }) => theme.textMedium};
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.textMedium};

      .icon {
        display: block;
      }
    }
  }
`;

const noop = () => {};

const Checkbox = ({
  checked = false,
  label = 'Checkbox',
  disabled = false,
  value = '',
  onChange = noop,
  size = 'medium'
}) => (
  <CheckboxContainer>
    <CheckInput
      checked={checked}
      disabled={disabled}
      type="checkbox"
      value={value}
      onChange={onChange}
    />
    <CheckContainer>
      <CheckIcon className="icon" htmlColor={'white'} />
    </CheckContainer>
    {label && <FieldLabel>{label}</FieldLabel>}
  </CheckboxContainer>
);

export default Checkbox;
