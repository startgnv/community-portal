import React, { useState } from 'react';
import styled from 'styled-components/macro';
import TextInput from './TextInput';
import Button from './Button';

import { db } from '../firebase';

const ApplyContainer = styled.div`
  .apply-btn {
    margin: 0 0 10px 0;
  }

  .email-collect {
    display: block;
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

const JobApply = ({ job, job: { applyUrl, id } = {} }) => {
  const [showForm, setShowForm] = useState(false);
  const [applicantEmail, setApplicantEmail] = useState('');
  const [submitState, setSubmitState] = useState({
    submitting: false,
    error: false,
    success: false
  });
  const onApplyClick = () => {
    // setShowForm(true);
    window.open(applyUrl);
  };
  const onFormSubmit = e => {
    e.preventDefault();
    setSubmitState({ submitting: true, error: false, success: false });
    db.collection('applications')
      .add({
        jobID: id,
        applyUrl,
        applicantEmail
      })
      .then(function() {
        setSubmitState({ submitting: false, error: false, success: true });
      })
      .catch(function(error) {
        setSubmitState({ submitting: false, error: error, success: false });
      });
    setTimeout(() => {
      window.open(applyUrl);
    }, 2000);
    return false;
  };
  let content;
  if (submitState.success) {
    content = <p>Success! Taking you to the job application...</p>;
  } else if (showForm) {
    const submitLabel = submitState.submitting ? 'Submitting...' : 'Submit';
    content = (
      <form className="email-collect" onSubmit={onFormSubmit}>
        <h4>Leave your email so we can stay in touch!</h4>
        <TextInput
          className="email-input"
          placeholder="Email"
          onChange={e => setApplicantEmail(e.target.value)}
          value={applicantEmail}
          fullWidth
        />
        <Button label={submitLabel} size="large" fullWidth type="submit" />
        <a href={applyUrl} className="no-thanks" target="_blank">
          No thanks, just take me to the application
        </a>
      </form>
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
