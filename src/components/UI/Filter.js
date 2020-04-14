import React from 'react';
import _ from 'lodash';
import styled from 'styled-components/macro';
import { clearFix } from 'polished';
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';

// Styles
const Container = styled.div`
  margin-bottom: 30px;
  text-align: left;
  clear: both;

  .filter-label {
    display: inline-block;
    height: 30px;
    margin-right: 10px;
    line-height: 30px;
  }
`;

const Title = styled.h3`
  margin-bottom: 10px;
  line-height: 20px;
  font-size: 0.6rem;
  text-transform: uppercase;
  font-family: benton-sans-wide;
  font-weight: 500;
  border-bottom: solid 1px ${({ theme }) => theme.uiBorder};
`;

const Item = styled.div`
  flex: ${({ full }) => (full ? 1 : 0)};
  margin-right: 10px;
`;

const DropdownContainer = styled.div`
  width: 260px;
  max-height: 260px;
  padding: 20px 10px 10px;
  text-align: left;
  background: white;
  overflow: auto;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  ${clearFix()}
`;

const DropdownTitle = styled.h6`
  margin: 0 0 5px 5px;
  font-size: 0.7rem;
  font-family: benton-sans-wide;
  font-weight: 500;
  text-transform: uppercase;
`;

const Controls = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const CheckContainer = styled.div``;

// Helper Functions
export const onFilterChange = (selectedItems, setSelectedItems, runEffect) => ({
  target: { checked, value }
}) => {
  let updatedItems;
  if (checked) {
    updatedItems = _.concat(selectedItems, value);
  } else {
    updatedItems = _.without(selectedItems, value);
  }

  setSelectedItems(updatedItems);
  runEffect(updatedItems);
};

// Components
export const Filter = ({ children }) => (
  <Container>
    <Title>Filter By</Title>
    <Controls>{children}</Controls>
  </Container>
);

export const FilterItem = ({
  label,
  title,
  items,
  selectedItems,
  onChange
}) => (
  <Item>
    <Dropdown btnLabel={label}>
      <DropdownContainer>
        <DropdownTitle>{title}</DropdownTitle>
        {items.map(({ name, id }) => (
          <CheckContainer key={id}>
            <Checkbox
              label={name}
              value={id}
              onChange={onChange}
              checked={selectedItems.indexOf(id) > -1}
              key={id}
            />
          </CheckContainer>
        ))}
      </DropdownContainer>
    </Dropdown>
  </Item>
);

export const FilterItemCustom = ({ children, full }) => (
  <Item full={full}>{children}</Item>
);
