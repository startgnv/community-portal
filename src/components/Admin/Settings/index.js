import React from 'react';
import FormCardPage from '../../FormCardPage';
import Grid from '@material-ui/core/Grid';
import { IndustryForm } from './IndustryForm';
import { Expandable } from './Expandable';
import { CategoryForm } from './CategoryForm';

const SettingsPage = () => {
  const onFormSubmit = () => {
    console.log('Form submitted');
  };

  return (
    <FormCardPage title="Settings" onSubmit={onFormSubmit}>
      <Grid container spacing={2} direction="column" justify="center">
        <Expandable label={'Company Industries'}>
          <IndustryForm />
        </Expandable>

        <Expandable startExpanded label={'Job Categories'}>
          <CategoryForm />
        </Expandable>
      </Grid>
    </FormCardPage>
  );
};

export default SettingsPage;
