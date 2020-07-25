import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { device } from '../../utils/device';
import { validate } from 'email-validator';
import { db, functions } from '../../../firebase';
import ValidatorInput from '../UI/validation/ValidatorInput';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  @media ${device.tabletPort}, ${device.mobile} {
    flex-flow: column nowrap;
    align-items: center;
    padding: 10px;
    max-width: 275px;
  }
`;

const Input = styled(ValidatorInput)`
  box-sizing: border-box;
  background: none;
  display: block;
  border: 1px solid ${({ theme }) => theme.lightBlue};
  border-radius: 3px;
  width: 100%;
  padding: 12px;
  color: ${({ theme }) => theme.lightBlue};
  font-family: sans-serif;
  font-size: 12px;
  margin: 20px 0;

  &::placeholder {
    color: rgba(${({ theme }) => theme.lightBlue}, 0.8);
  }
`;

const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  background-color: ${({ theme }) => theme.lightBlue};
  border-radius: 3px;
  border: none;
  color: ${({ theme }) => theme.deepNavy};
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 12px;
  padding: 12px 0;
`;

const Header = styled.h3`
  margin-bottom: 5px;
  color: #a3a9b3;
  font-size: 13px;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
`;

const Description = styled.p`
  color: #a3a9b3;
  font-size: 13px;
  margin-top: 15px;
`;

const addNewsletterSubscriber = functions.httpsCallable(
  'addNewsletterSubscriber'
);

const NewsletterForm = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitInput = async () => {
    if (!validate(input)) {
      setError('Please enter a valid email address');
    } else {
      try {
        await addNewsletterSubscriber({ email: input });
        setInput('');
        setError('');
        setSubmitted(true);
      } catch (err) {
        console.error('Error adding subscriber: ', err);
        setError('Unable to submit, please try again later.');
        setInput('');
      }
    }
  };

  return (
    <Container>
      <Header>SUBSCRIBE TO OUR NEWSLETTER</Header>
      <Input
        submitted={submitted}
        error={error}
        onChange={setInput}
        value={input}
        placeholder="Email"
        successMessage="Thank you for signing up!"
      />
      <SubmitBtn onClick={submitInput}>SUBMIT</SubmitBtn>
      <Description>
        Stay notified for regular updates on upcoming events and ways to get
        involved
      </Description>
    </Container>
  );
};

export default NewsletterForm;
