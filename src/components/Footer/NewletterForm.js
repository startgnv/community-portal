import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { device } from '../device';
import { validate } from 'email-validator';
import { db } from '../../firebase';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  @media ${device.tabletPort}, ${device.mobile} {
    flex-flow: column nowrap;
    align-items: center;
    padding: 10px;
    max-width: 275px;
    margin-top: 50px;
  }
`;

const ErrorLabel = styled.label`
  color: #ff3333;
  font-size: 10px;
  font-family: Arial, sans-serif;
  margin-top: 20px;
  margin-bottom: 3px;
  align-self: flex-start;
`;

const SubmitLabel = styled.label`
  color: #00e171;
  font-size: 10px;
  font-family: Arial, sans-serif;
  margin-top: 20px;
  margin-bottom: 3px;
  align-self: flex-start;
`;

const Input = styled.input`
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

  ${({ error }) =>
    error &&
    `
    border: 1px solid #ff3333;
    margin-top: 0;
  `}
  ${({ submitted }) =>
    submitted &&
    `
    border: 1px solid #00e171;
    margin-top: 0;
  `}
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

const NewsletterForm = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitInput = async () => {
    if (!validate(input)) {
      setError('Please enter a valid email address');
    } else {
      try {
        await db
          .collection('newsletterSubscribers')
          .doc(input)
          .set({});
        console.log('Document Created!');
        setInput('');
        setError('');
        setSubmitted(true);
      } catch (err) {
        console.error('Error creating document: ', err);
        setError('Unable to submit, please try again later.');
        setInput('');
      }
    }
  };

  return (
    <Container>
      <Header>SUBSCRIBE TO OUR NEWSLETTER</Header>
      {error && <ErrorLabel>{error}</ErrorLabel>}
      {submitted && <SubmitLabel>Thank you for signing up!</SubmitLabel>}
      <Input
        disabled={submitted}
        submitted={submitted}
        error={error}
        placeholder="Email"
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
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
