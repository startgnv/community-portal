import React, { useState } from 'react';
import styled from 'styled-components/macro';
import TextInput from './TextInput';
import Button from './Button';

const ApplyContainer = styled.div`
  .apply-btn {
    margin: 0 0 10px 0;
  }

  .email-collect {
    padding: 20px;
    background-color: ${({ theme }) => theme.uiBackground};
    border-radius: 6px;
    text-align: center;

    h4 {
      margin: 0 0 10px 0;
    }

    .email-input {
      margin-bottom: 10px;
    }

    .no-thanks {
      margin-top: 10px;
      font-size: 12px;
      color: ${({ theme }) => theme.textMedium};
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.textDark};
        text-decoration: underline;
      }
    }
  }
`;

const JobApply = ({ applyUrl }) => {
  const [showForm, setShowForm] = useState(false);
  const onApplyClick = () => {
    setShowForm(true);
  };
  const onNoThanksClick = () => {
    window.open(applyUrl);
  };
  let content;
  if (showForm) {
    content = (
      <div className="email-collect">
        <h4>Leave your email so we can keep in touch!</h4>
        <TextInput className="email-input" placeholder="Email" fullWidth />
        <Button label="Submit" size="large" fullWidth />
        <span className="no-thanks" onClick={onNoThanksClick}>
          No thanks, just take me to the application
        </span>
      </div>
    );
  } else {
    content = (
      <Button
        className="apply-btn"
        label="Apply"
        size="extraLarge"
        onClick={onApplyClick}
        fullWidth
      />
    );
  }
  return <ApplyContainer>{content}</ApplyContainer>;
};

export default JobApply;
