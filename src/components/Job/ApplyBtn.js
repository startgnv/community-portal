import React from 'react';
import styled from 'styled-components/macro';
import Button from '../Button';

const Container = styled.div`
  .apply-btn {
    margin: 0 0 10px 0;
  }
`;

const ApplyBtn = ({ job, job: { applyUrl } = {}, companyName = '' }) => {
  const onApplyClick = () => {
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Jobs',
      eventAction: 'applyClick',
      eventLabel: `Job: ${job.title} Company: ${companyName}`
    });
    window.open(applyUrl);
  };

  return (
    <Container>
      <Button
        className="apply-btn"
        label="Apply"
        size="extraLarge"
        onClick={onApplyClick}
        fullWidth
      />
    </Container>
  );
};

export default ApplyBtn;
