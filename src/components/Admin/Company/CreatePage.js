import React, { useState } from 'react';
import firebase, { db, storage } from '../../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAdminContainer } from '../UI/PageContainer';
import Form from './Form';

export const CreatePage = ({ history }) => {
  const [isDraft, setDraft] = useState(false);

  const [industries = [], loadingIndustries] = useCollectionData(
    db.collection('companyCategories'),
    { idField: 'id' }
  );
  const [name, setName] = useState('');
  const [address, setAddress] = useState({});
  const [logoImg, setLogoImg] = useState(null); // Blob
  const [coverImg, setCoverImg] = useState(null); // Blob
  const [listingImg, setListingImg] = useState(null); // Blob
  const [photos, setPhotos] = useState([]); // Blob[]
  const [inputAddress, setInputAddress] = useState('');
  const [slug, setSlug] = useState('');
  const [industryID, setIndustryID] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [founded, setFounded] = useState('');
  const [instagram, setInstagram] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [featured, setFeatured] = useState(false);
  const [isSponsor, setIsSponsor] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useAdminContainer({
    loading,
    backTo: '/admin/companies'
  });

  const toggleDraft = () => {
    setDraft(true);
  };

  const industryOptions = industries.map(({ id, name }) => ({
    value: id,
    label: name
  }));

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const company = {
      name,
      slug,
      address: address.place_name || null,
      coordinates: address.center
        ? new firebase.firestore.GeoPoint(...address.center.reverse())
        : null,
      url,
      founded,
      instagram,
      employeeCount,
      description,
      shortDescription,
      industryID,
      featured,
      isSponsor,
      TSUpdated: Date.now(),
      TSCreated: Date.now()
    };

    let doc;
    if (isDraft) {
      doc = db.collection('companyDrafts').doc();
    } else {
      doc = db.collection('companies').doc();
    }

    // Create a new company in Firebase
    doc
      .set(company)
      // 1: Upload new images to Firebase storage
      .then(() => {
        const imgUploads = [];

        if (coverImg) {
          const coverRes = storage.ref(`companyCovers/${doc.id}`).put(coverImg);
          imgUploads.push(coverRes);
        } else {
          imgUploads.push(null);
        }

        if (listingImg) {
          const listingRes = storage
            .ref(`companyListings/${doc.id}`)
            .put(listingImg);
          imgUploads.push(listingRes);
        } else {
          imgUploads.push(null);
        }

        if (logoImg) {
          const logoRes = storage.ref(`companyLogos/${doc.id}`).put(logoImg);
          imgUploads.push(logoRes);
        } else {
          imgUploads.push(null);
        }

        if (photos.length > 0) {
          for (let file of photos) {
            const fileRes = storage
              .ref(`companyPhotos/${doc.id}/${file.name}`)
              .put(file);
            imgUploads.push(fileRes);
          }
        }

        return Promise.all(imgUploads);
      })
      // 2: Fetch storage URL's for linking photos in database
      .then(([newCover, newListing, newLogo, ...newPhotos]) => {
        if (newPhotos) {
          return Promise.all([
            Promise.resolve(newCover),
            Promise.resolve(newListing),
            Promise.resolve(newLogo),
            newPhotos
              ? Promise.all(
                  newPhotos.map(photo => {
                    return photo.ref.getDownloadURL();
                  })
                )
              : Promise.resolve()
          ]);
        }
        // return Promise.resolve([newCover, newListing, newLogo]);
      })
      // 3: Update doc with all new additions
      .then(([newCover, newListing, newLogo, photoUrls]) => {
        // only set the fields we changed so we don't overwrite someone
        // else
        const update = {};

        if (newCover) {
          update.coverPath = newCover.ref.fullPath;
        }

        if (newListing) {
          update.listingPath = newListing.ref.fullPath;
        }

        if (newLogo) {
          update.logoPath = newLogo.ref.fullPath;
        }

        if (photoUrls && photoUrls.length > 0) {
          update.photos = firebase.firestore.FieldValue.arrayUnion(
            ...photoUrls
          );
        }

        return doc.set(update, { merge: true });
      })
      // 4: Update loading state
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          history.goBack();
        }, 800);
      })
      .catch(e => {
        console.error(e.message);
      });
  };

  return (
    <Form
      onSubmit={onSubmit}
      toggleDraft={toggleDraft}
      success={success}
      loading={loading || loadingIndustries}
      onCancel={history.goBack}
      setCoverImg={setCoverImg}
      setListingImg={setListingImg}
      setLogoImg={setLogoImg}
      name={name}
      setName={setName}
      slug={slug}
      setSlug={setSlug}
      isFeatured={featured}
      setFeatured={setFeatured}
      isSponsor={isSponsor}
      setSponsored={setIsSponsor}
      industryId={industryID}
      setIndustryId={setIndustryID}
      industryOptions={industryOptions}
      description={description}
      setDescription={setDescription}
      shortDescription={shortDescription}
      setShortDescription={setShortDescription}
      address={address}
      setAddress={setAddress}
      addressBuffer={inputAddress}
      setAddressBuffer={setInputAddress}
      websiteUrl={url}
      setWebsiteUrl={setUrl}
      foundedDate={founded}
      setFoundedDate={setFounded}
      employeeCount={employeeCount}
      setEmployeeCount={setEmployeeCount}
      instagramUsername={instagram}
      setInstagramUsername={setInstagram}
      setPhotos={setPhotos}
      // This is a no-op since a new company is being created, thus there are
      // no photos yet we could remove from storage
      setPhotosToRemove={() => {}}
    />
  );
};

export default CreatePage;
