import React from 'react';
import FormCardPage from 'src/components/Admin/UI/FormCardPage';
import Grid from '@material-ui/core/Grid';
import { IndustryForm } from 'src/components/Admin/Settings/IndustryForm';
import { Expandable } from 'src/components/Admin/Settings/Expandable';
import { CategoryForm } from 'src/components/Admin/Settings/CategoryForm';

const SettingsPage = () => {
  const onFormSubmit = () => {
    console.log('Form submitted');
  };

  return (
    <FormCardPage title="Settings" onSubmit={onFormSubmit}>
      <Grid container spacing={2} direction="column" justifyContent="center">
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
