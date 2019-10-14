import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import ClearIcon from '@material-ui/icons/Clear';

const SearchContainer = styled.div`
  position: relative;
`;

const IconContainer = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  right: 0;
  top: 0;
  padding: 8px 0 0 8px;
  cursor: pointer;
`;

const SearchInput = ({ onChange = () => {} }) => {
  const [value, setValue] = useState('');
  const onFieldChange = e => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  const onClearClick = () => {
    setValue('');
    onChange('');
  };
  return (
    <SearchContainer>
      {value && (
        <IconContainer onClick={onClearClick}>
          <ClearIcon />
        </IconContainer>
      )}
      <TextInput onChange={onFieldChange} value={value} />
    </SearchContainer>
  );
};

export default SearchInput;
