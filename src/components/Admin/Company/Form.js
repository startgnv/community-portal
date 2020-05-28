import React from 'react';
import FormCardPage from '../UI/FormCardPage';
import Grid from '@material-ui/core/Grid';
import FileInput from './Field/FileInput';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';
import GeocodingInput from './GeocodingInput';
import FilesInput from './Field/FilesInput';
import Button from '@material-ui/core/Button';

const Form = ({
  onSubmit,
  toggleDraft,
  success,
  loading,
  onCancel,

  coverImg,
  setCoverImg,
  listingImg,
  setListingImg,
  logoImg,
  setLogoImg,
  name,
  setName,
  slug,
  setSlug,
  isFeatured,
  setFeatured,
  isSponsor,
  setSponsored,
  industryId,
  setIndustryId,
  industryOptions,
  description,
  setDescription,
  shortDescription,
  setShortDescription,
  address,
  setAddress,
  addressBuffer,
  setAddressBuffer,
  websiteUrl,
  setWebsiteUrl,
  foundedDate,
  setFoundedDate,
  employeeCount,
  setEmployeeCount,
  instagramUsername,
  setInstagramUsername,
  photos,
  setPhotos,
  setPhotosToDelete
}) => {
  const sizeOptions = ['<10', '10-50', '50-100', '100-500', '500+'].map(
    opt => ({ label: opt, value: opt })
  );

  return (
    <FormCardPage title="Company Details" onSubmit={onSubmit}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <FileInput
            label="Cover"
            setFile={setCoverImg}
            defaultValue={coverImg}
            alt="Logo"
          />
        </Grid>
        <Grid item>
          <FileInput
            label="Listing"
            setFile={setListingImg}
            defaultValue={listingImg}
            alt="Logo"
          />
        </Grid>
        <Grid item>
          <FileInput
            label="Logo"
            setFile={setLogoImg}
            defaultValue={logoImg}
            alt="Logo"
          />
        </Grid>

        <Grid item>
          <TextField
            value={name}
            label="Company Name"
            variant="outlined"
            onChange={e => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            value={slug}
            fullWidth
            variant="outlined"
            label="Slug for readable URLs"
            onChange={e => setSlug(e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(isFeatured)}
                onChange={e => setFeatured(e.target.checked)}
                name="featured"
              />
            }
            label="Featured"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(isSponsor)}
                onChange={e => setSponsored(e.target.checked)}
                value="isSponsor"
              />
            }
            label="Sponsor"
          />
        </Grid>
        <Grid item>
          <FormLabel>Industry</FormLabel>
          <Select
            label="Industry"
            disabled={loading}
            options={industryOptions}
            value={industryOptions.find(({ value }) => industryId === value)}
            onChange={({ value }) => setIndustryId(value)}
          />
        </Grid>
        <Grid item>
          <TextField
            value={description}
            fullWidth
            variant="outlined"
            label="Description"
            onChange={e => setDescription(e.target.value)}
            multiline
          />
        </Grid>
        <Grid item>
          <TextField
            value={shortDescription}
            fullWidth
            variant="outlined"
            label="Short Description"
            onChange={e => setShortDescription(e.target.value)}
            multiline
          />
        </Grid>
        <Grid item>
          <FormLabel>Address</FormLabel>
          <GeocodingInput
            placeholder="Address"
            isClearable
            hideSelectedOptions={false}
            inputValue={addressBuffer}
            onInputChange={(val, { action, ...other }) => {
              if (action !== 'input-blur' && action !== 'menu-close') {
                setAddressBuffer(val);
              }
            }}
            defaultOptions={[address]}
            onChange={(val, { action }) => {
              if (action === 'select-option') {
                setAddress(val);
              }
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            value={websiteUrl}
            fullWidth
            variant="outlined"
            label="Website URL"
            onChange={e => setWebsiteUrl(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            value={foundedDate}
            fullWidth
            variant="outlined"
            label="Year Founded"
            onChange={e => setFoundedDate(e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormLabel>Employee Count</FormLabel>
          <Select
            label="Employee Count"
            options={sizeOptions}
            value={sizeOptions.find(({ value }) => employeeCount === value)}
            onChange={({ value }) => setEmployeeCount(value)}
          />
        </Grid>
        <Grid item>
          <TextField
            value={instagramUsername}
            fullWidth
            variant="outlined"
            label="Instagram Username"
            onChange={e => setInstagramUsername(e.target.value)}
          />
        </Grid>
        <FilesInput
          setFiles={setPhotos}
          setPhotosToDelete={setPhotosToDelete}
          defaultValues={photos}
        />
        <Grid item container justify="flex-end">
          <Button
            disabled={success || loading}
            variant="text"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            disabled={success || loading}
            variant="text"
            type="submit"
            onClick={toggleDraft}
          >
            {success ? 'Saved' : 'Save As Draft'}
          </Button>
          <Button
            disabled={success || loading}
            variant="contained"
            color="primary"
            type="submit"
          >
            {success ? 'Published' : 'Publish'}
          </Button>
        </Grid>
      </Grid>
    </FormCardPage>
  );
};

export default Form;
