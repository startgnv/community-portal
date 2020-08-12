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
import Checkbox from '../UI/Checkbox';
import NewCompanyForm from '../Company/NewCompanyForm';
import Field from '../UI/Form/Field';
import FieldRow from '../UI/Form/FieldRow';

const CheckContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
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
  padding: 12px 15px;
  border: 0;
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.uiBorder};
  box-sizing: border-box;
  border-radius: 3px;
  width: 100%;
  font-family: WilliamsCaslonText, serif;
  resize: vertical;
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

  // Company Information
  const [isNewCompany, setIsNewCompany] = useState(false);

  const [companyAddress, setCompanyAddress] = useState('');
  const [companyAddressError, setCompanyAddressError] = useState('');

  const [companyUrl, setCompanyUrl] = useState('');
  const [companyUrlError, setCompanyUrlError] = useState('');

  const [companyYearFounded, setCompanyYearFounded] = useState('');
  const [companyYearFoundedError, setCompanyYearFoundedError] = useState('');

  const [companyEmployeeCount, setCompanyEmployeeCount] = useState('<10');
  const [companyEmployeeCountError, setCompanyEmployeeCountError] = useState(
    ''
  );

  const [companyDescription, setCompanyDescription] = useState('');
  const [companyDescriptionError] = useState('');

  // Job Information
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

  const jobValidators = [
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

  const companyValidators = [
    [companyAddress, setCompanyAddressError, Validators.required],
    [companyUrl, setCompanyUrlError, Validators.required],
    [companyYearFounded, setCompanyYearFoundedError, Validators.required],
    [companyEmployeeCount, setCompanyEmployeeCountError, Validators.required]
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

    const isJobValid = validate(jobValidators);

    if (!isJobValid) return;

    if (isNewCompany && !validate(companyValidators)) return;

    setLoading(true);
    const jobPromise = db
      .collection(
        process.env.REACT_APP_ENVIRONMENT === 'test'
          ? 'draftJobsTest'
          : 'draftJobs'
      )
      .add({
        title: jobTitle,
        description: jobDescription,
        applyUrl,
        type: jobType,
        companyContactEmail,
        companyName
      });

    const companyPromise = !isNewCompany
      ? Promise.resolve()
      : db.collection('companyDrafts').add({
          address: companyAddress,
          description: companyDescription,
          employeeCount: companyEmployeeCount,
          founded: companyYearFounded,
          name: companyName,
          slug: companyName
            .split(' ')
            .join('-')
            .toLowerCase(),
          url: companyUrl
        });

    Promise.all([jobPromise, companyPromise])
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
      <Title>Submit Your Available Position</Title>

      {success && <p>Success! We'll be in touch soon!</p>}
      {loading && <p>Submitting...</p>}
      {!loading && !success && (
        <>
          <Description>
            Please fill out all the fields below. If there are any issues
            withyour submission, we will reach out to you at the Company Contact
            Email you provide prior to posting. Postings will stay live for at
            least 30 days unless notified.
            <br />
            <br />
            Please note in order to share a job listing, your company must also
            be listed on the site.
          </Description>
          <form onSubmit={onSubmit}>
            <CheckContainer>
              <Checkbox
                checked={isNewCompany}
                onChange={() => setIsNewCompany(!isNewCompany)}
                label="I also need to list my company."
              />
            </CheckContainer>
            {isNewCompany && (
              <NewCompanyForm
                companyAddress={companyAddress}
                setCompanyAddress={setCompanyAddress}
                companyAddressError={companyAddressError}
                companyUrl={companyUrl}
                setCompanyUrl={setCompanyUrl}
                companyUrlError={companyUrlError}
                companyYearFounded={companyYearFounded}
                setCompanyYearFounded={setCompanyYearFounded}
                companyYearFoundedError={companyYearFoundedError}
                companyEmployeeCount={companyEmployeeCount}
                setCompanyEmployeeCount={setCompanyEmployeeCount}
                companyEmployeeCountError={companyEmployeeCountError}
                companyDescription={companyDescription}
                setCompanyDescription={setCompanyDescription}
                companyDescriptionError={companyDescriptionError}
              />
            )}
            <FieldRow>
              <Field>
                <Input
                  testId="field-job-title"
                  placeholder="Job Title"
                  onChange={setJobTitle}
                  value={jobTitle}
                  error={jobTitleError}
                />
              </Field>
              <Field>
                <Input
                  testId="field-application-url"
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
                  testId="field-contact-email"
                  placeholder="Company Contact Email"
                  onChange={setCompanyContactEmail}
                  value={companyContactEmail}
                  error={companyContactEmailError}
                />
              </Field>
              <Field>
                <Input
                  testId="field-company-name"
                  placeholder="Company Name"
                  onChange={setCompanyName}
                  value={companyName}
                  error={companyNameError}
                />
              </Field>
            </FieldRow>
            <Field>
              <Editor
                webDriverTestID="field-description"
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
            <Button testId="submit" label="Submit" type="submit" />
          </form>
        </>
      )}
    </PageContainer>
  );
};

export default RequestJobPage;
