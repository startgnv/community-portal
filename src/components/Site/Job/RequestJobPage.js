import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ValidatorInput from '../UI/validation/ValidatorInput';
import ValidatorSelect from '../UI/validation/ValidatorSelect';
import { validate, Validators } from '../UI/validation/useValidation';
import { db } from '../../../firebase';
import PageContainer from '../UI/PageContainer';
import Button from '../UI/Button';
import dropdownArrow from '../../../assets/images/dropdown-arrow.svg';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Link } from 'react-router-dom';

const Field = styled.div`
  margin-bottom: 10px;
  flex: 1;
  width: 100%;
  min-width: 190px;
`;

const FieldRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const Description = styled.p`
  max-width: 520px;
`;

const Input = styled(ValidatorInput)`
  display: block;
  height: 40px;
  padding: 0 15px;
  border: 0;
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.uiBorder};
  box-sizing: border-box;
  border-radius: 3px;
  width: 100%;
`;

const Select = styled(ValidatorSelect)`
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 15px;
  border: 0;
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.uiBorder};
  box-sizing: border-box;
  border-radius: 3px;
  flex: 1;

  // Removes the default arrow icon
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  // Sets a custom arrow icon
  background-image: url(${dropdownArrow}),
    linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.9em top 50%, 0 0;
  background-size: 12px auto, 100%;
`;

const wysiwygToolbar = {
  options: ['inline', 'blockType', 'list'],
  inline: {
    options: ['bold', 'italic', 'underline'],
    bold: { className: 'bordered-option-classname' },
    italic: { className: 'bordered-option-classname' },
    underline: { className: 'bordered-option-classname' }
  },
  blockType: {
    className: 'bordered-option-classname'
  }
};

const RequestJobPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [jobTitle, setJobTitle] = React.useState('');
  const [jobTitleError, setJobTitleError] = React.useState('');

  const [jobDescription, setJobDescription] = React.useState(
    'Input your full job description here as you would like it to appear on the page.'
  );

  const [applyUrl, setApplyUrl] = React.useState('');
  const [applyUrlError, setApplyUrlError] = React.useState('');

  const [jobType, setJobType] = React.useState('fullTime');
  const [jobTypeError, setJobTypeError] = React.useState('');

  const [companyContactEmail, setCompanyContactEmail] = React.useState('');
  const [
    companyContactEmailError,
    setCompanyContactEmailError
  ] = React.useState('');

  const [companyName, setCompanyName] = React.useState('');
  const [companyNameError, setCompanyNameError] = React.useState('');

  const [wysiwygState, setWysiwygState] = useState(EditorState.createEmpty());

  const validators = [
    [jobTitle, setJobTitleError, Validators.required],
    [applyUrl, setApplyUrlError, Validators.required],
    [jobType, setJobTypeError, Validators.required],
    [
      companyContactEmail,
      setCompanyContactEmailError,
      Validators.required,
      Validators.email
    ],
    [companyName, setCompanyNameError, Validators.required]
  ];

  useEffect(() => {
    const contentBlock = htmlToDraft(`<p>${jobDescription}</p>`);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);
    setWysiwygState(editorState);
  }, []);

  const onWysiwygStateChange = state => {
    setJobDescription(draftToHtml(convertToRaw(state.getCurrentContent())));
    setWysiwygState(state);
  };

  const onSubmit = e => {
    e.preventDefault();

    const isValid = validate(validators);

    if (!isValid) return;

    setLoading(true);
    db.collection('draftJobs')
      .add({
        title: jobTitle,
        description: jobDescription,
        applyUrl,
        type: jobType,
        companyContactEmail,
        companyName
      })
      .then(() => {
        setLoading(false);
        setSuccess(true);
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
      });
  };

  return (
    <PageContainer>
      <Title>Submit A Job Application</Title>

      {success && <p>Success! We'll be in touch soon!</p>}
      {loading && <p>Submitting...</p>}
      {!loading && !success && (
        <>
          <Description>
            Input all the information you can here about the position you're
            looking to fill. We will most likely reach out to you prior to
            publishing your application to confirm all the details. If you've
            never posted a job here before, you're required to submit some
            additional information about your company for verification before
            your job application can be considered.{' '}
            <Link to="/add-company">Get verified</Link>
          </Description>
          <form onSubmit={onSubmit}>
            <FieldRow>
              <Field>
                <Input
                  placeholder="Job Title"
                  onChange={setJobTitle}
                  value={jobTitle}
                  error={jobTitleError}
                />
              </Field>
              <Field>
                <Input
                  placeholder="Application Url"
                  onChange={setApplyUrl}
                  value={applyUrl}
                  error={applyUrlError}
                />
              </Field>
              <Field>
                <Select
                  placeholder="Job Type"
                  onChange={setJobType}
                  value={jobType}
                  error={jobTypeError}
                >
                  <option value="fullTime">Full-Time</option>
                  <option value="partTime">Part-Time</option>
                </Select>
              </Field>
              <Field>
                <Input
                  placeholder="Company Contact Email"
                  onChange={setCompanyContactEmail}
                  value={companyContactEmail}
                  error={companyContactEmailError}
                />
              </Field>
              <Field>
                <Input
                  placeholder="Company Name"
                  onChange={setCompanyName}
                  value={companyName}
                  error={companyNameError}
                />
              </Field>
            </FieldRow>
            <Field>
              <Editor
                editorState={wysiwygState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorStyle={{
                  border: 'solid 1px rgba(0, 0, 0, 0.25)',
                  borderTop: '0px',
                  padding: '0 15px',
                  borderRadius: '0 0 4px 4px'
                }}
                toolbarStyle={{
                  marginBottom: '0px',
                  border: 'solid 1px rgba(0, 0, 0, 0.25)',
                  borderRadius: '4px 4px 0 0'
                }}
                toolbar={wysiwygToolbar}
                onEditorStateChange={onWysiwygStateChange}
              />
            </Field>
            <Button label="Submit" type="submit" />
          </form>
        </>
      )}
    </PageContainer>
  );
};

export default RequestJobPage;
