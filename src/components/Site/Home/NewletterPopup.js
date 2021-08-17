import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { validate } from 'email-validator';
import { functions } from '../../../firebase';
import { device } from '../../utils/device';
import { useRouter } from 'next/dist/client/router';

const Container = styled.div`
  width: 100%;
  padding: 20px 0;
  background-color: ${({ theme }) => theme.deepNavy};

  position: fixed;
  bottom: 0;
  z-index: 1000;

  transform: translate(0, 80px);
  transition: all 500ms;

  &.visible {
    transform: translate(0, 0);
  }
`;

const Form = styled.form`
  max-width: 1020px;
  margin: auto;
  display: grid;
  grid-template-areas:
    'header . input submit'
    'subheader . input submit';

  grid-template-columns: auto minmax(0, 1fr) minmax(0, 1fr) auto;

  overflow-x: hidden;

  @media ${device.tabletPort}, ${device.mobile} {
    grid-template-areas:
      'header'
      'subheader'
      'input'
      'submit';

    grid-template-columns: 1fr;
  }
`;

const Header = styled.h3`
  grid-area: header;
  font-family: WilliamsCaslonText, sans-serif;
  font-size: 18px;
  color: white;

  @media ${device.tabletPort}, ${device.mobile} {
    margin: auto;
  }
`;

const SubHeader = styled.h4`
  grid-area: subheader;
  font-family: WilliamsCaslonText, sans-serif;
  font-size: 15px;
  color: ${({ theme }) => theme.lightBlue};

  @media ${device.tabletPort}, ${device.mobile} {
    margin: auto;
  }
`;

const Input = styled.input`
  grid-area: input;
  box-sizing: border-box;
  background: none;
  display: block;
  border: 1px solid ${({ theme }) => theme.lightBlue};
  border-radius: 3px;
  max-width: 350px;
  padding: 12px;
  color: ${({ theme }) => theme.lightBlue};
  font-family: sans-serif;
  font-size: 12px;
  margin-right: 20px;

  &::placeholder {
    color: rgba(${({ theme }) => theme.lightBlue}, 0.8);
  }

  @media ${device.tabletPort}, ${device.mobile} {
    margin: 20px auto;
    width: 100%;
  }
`;

const Close = styled.button`
  background: none;
  border: none;

  position: absolute;
  right: 30px;
  top: 10px;

  @media ${device.tabletPort}, ${device.mobile} {
    right: 10px;
  }
`;

const Subscribe = styled.button`
  grid-area: submit;
  width: 130px;

  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.deepNavy};

  border: none;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.lightBlue};

  @media ${device.tabletPort}, ${device.mobile} {
    height: 40px;
    margin: auto;
  }
`;

const NewsletterPopup = ({ canBeVisible }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isHidden, setHideState] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(null);
  const [isClosed, setClosed] = useState(false);
  const { pathname } = useRouter();

  let addNewsletterSubscriber;

  useEffect(() => {
    if (!functions) return;
    addNewsletterSubscriber = functions.httpsCallable(
      'addNewsletterSubscriber'
    );
  });

  const submitInput = async e => {
    e.preventDefault();
    if (!validate(input)) {
      setError('Please enter a valid email address');
    } else {
      try {
        await addNewsletterSubscriber({ email: input });
        setInput('');
        setError('');
        setClosed(true);
      } catch (err) {
        console.error('Error adding subscriber: ', err);
        setError('Unable to submit, please try again later.');
        setInput('');
        setClosed(true);
      }
    }
  };

  const hidePopup = () => {
    if (window.scrollY > scrollHeight) {
      setHideState(true);
    } else {
      setHideState(false);
    }

    setScrollHeight(window.scrollY);
  };

  const close = () => {
    setClosed(true);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', hidePopup);

    if (!scrollHeight) setScrollHeight(window.scrollY || 0);

    return () => window.removeEventListener('scroll', hidePopup);
  });

  return (
    <Container
      hidden={!canBeVisible || isClosed || pathname !== '/'}
      className={!isHidden ? 'visible' : ''}
    >
      <Form>
        <Header>Join our Newsletter!</Header>
        <SubHeader>Get the latest on events, jobs and more.</SubHeader>
        <Input
          error={error}
          onChange={ev => setInput(ev.target.value)}
          value={input}
          placeholder="Email"
          successMessage="Thank you for signing up!"
        />
        <Subscribe onClick={submitInput}>SUBSCRIBE</Subscribe>
      </Form>

      <Close onClick={close}>
        <img src={'/assets/images/x.svg'} alt="X" />
      </Close>
    </Container>
  );
};

export default NewsletterPopup;
