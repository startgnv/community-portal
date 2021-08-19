import React from 'react';
import Link from 'src/components/Site/UI/Link';
import styled from 'styled-components/macro';

const RequestContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Label = styled.p`
  font-family: Arial, sans-serif;
  color: rgba(19, 21, 22, 0.6);
  font-size: 14px;
  text-align: right;
`;

const RequestBtn = styled.button`
  font-family: Arial, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;

  background: #f35b1a;
  box-shadow: 0 0 4px rgba(243, 91, 26, 0.5);
  border: none;
  border-radius: 3px;

  padding: 15px 30px;
  margin-left: 15px;
`;

const RequestButton = ({ to = '', label, children }) => {
  return (
    <RequestContainer>
      <Label>{label}</Label>
      <Link to={to}>
        <RequestBtn>{children}</RequestBtn>
      </Link>
    </RequestContainer>
  );
};

export default RequestButton;
