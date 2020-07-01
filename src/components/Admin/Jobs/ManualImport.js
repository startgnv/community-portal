import React from 'react';

const ManualImport = () => (
  <>
    <Typography variant="h6">Manual Import URL</Typography>
    <Typography variant="body1">
      Visit the link and copy/paste the text into the field below.
    </Typography>
    <a href={companyJobs.manualUrl} target="_blank">
      View Import Data
    </a>
    <Grid style={{ marginTop: '10px' }}>
      <TextField
        label="Jobs Data"
        multiline
        rows={10}
        onChange={() => {}}
        variant="outlined"
      />
    </Grid>
  </>
);

export default ManualImport;
