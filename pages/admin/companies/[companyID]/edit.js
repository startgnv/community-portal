import React, { useState, useEffect, useRef, useCallback } from 'react';
import firebase, { db, storage } from 'src/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAdminContainer } from 'src/components/Admin/UI/PageContainer';
import Form from 'src/components/Admin/Company/Form';
import { useRouter } from 'next/router';

const EditPageWrapper = () => {

  const router = useRouter();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { companyID } = router.query;
    db.collection('companyDrafts')
      .doc(companyID)
      .get()
      .then(snapshot => {
        if (snapshot.exists && snapshot.data().name) {
          setCompany({ id: snapshot.id, ...snapshot.data() });
          setLoading(false);
        } else {
          return db
            .collection('companies')
            .doc(companyID)
            .get();
        }
      })
      .then(snapshot => {
        setCompany({ id: snapshot.id, ...snapshot.data() });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) return <h1>Loading...</h1>;

  return <EditPage company={company}q />;
};

export const EditPage = ({ company }) => {
  const [isDraft, setDraft] = useState(false);
  const router = useRouter();

  const [industries = [], loadingIndustries] = useCollectionData(
    db.collection('companyCategories'),
    { idField: 'id' }
  );
  const [name, setName] = useState(company.name || '');
  const [address, setAddress] = useState({
    center: company.coordinates
      ? [company.coordinates.longitude, company.coordinates.latitude]
      : [29.6516, 82.3248], // Default to coordinates for Gainesville, FL
    place_name: company.address || ''
  });
  const [logoImg, setLogoImg] = useState({ isString: true, value: '' }); // { isString: boolean, value: string | Blob }
  const [coverImg, setCoverImg] = useState({ isString: true, value: '' }); // { isString: boolean, value: string | Blob }
  const [listingImg, setListingImg] = useState({ isString: true, value: '' }); // { isString: boolean, value: string | Blob }
  const [photos, setPhotos] = useState(
    company.photos
      ? company.photos.map(photoUrl => ({ isString: true, value: photoUrl }))
      : []
  ); // { isString: boolean, value: string | Blob }[]
  const [photosToDelete, setPhotosToDelete] = useState([]); // string[]
  const [inputAddress, setInputAddress] = useState(company.address || '');
  const [slug, setSlug] = useState(company.slug || '');
  const [industryID, setIndustryID] = useState(company.industryID || '');
  const [url, setUrl] = useState(company.url || '');
  const [description, setDescription] = useState(company.description || '');
  const [shortDescription, setShortDescription] = useState(
    company.shortDescription || ''
  );
  const [founded, setFounded] = useState(company.founded || '');
  const [instagram, setInstagram] = useState(company.instagram || '');
  const [employeeCount, setEmployeeCount] = useState(
    company.employeeCount || ''
  );
  const [featured, setFeatured] = useState(company.featured || false);
  const [isSponsor, setIsSponsor] = useState(company.isSponsor || '');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // These images are referenced in Firestore by their relative storage path,
  // thus their actual image URL must be fetched
  useEffect(() => {
    Promise.all([
      company.coverPath
        ? storage.ref(company.coverPath).getDownloadURL()
        : Promise.resolve(null),
      company.listingPath
        ? storage.ref(company.listingPath).getDownloadURL()
        : Promise.resolve(null),
      company.logoPath
        ? storage.ref(company.logoPath).getDownloadURL()
        : Promise.resolve(null)
    ]).then(([coverUrl, listingUrl, logoUrl]) => {
      if (coverUrl) setCoverImg({ isString: true, value: coverUrl });

      if (listingUrl) setListingImg({ isString: true, value: listingUrl });

      if (logoUrl) setLogoImg({ isString: true, value: logoUrl });
    });
  }, []);

  useAdminContainer({
    loading: loading || loadingIndustries,
    backTo: '/admin/companies'
  });

  const industryOptions = industries.map(({ id, name }) => ({
    value: id,
    label: name
  }));

  const toggleDraft = () => {
    setDraft(true);
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const updatedCompany = {
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
      TSCreated: company.TSCreated ? company.TSCreated : Date.now(),
      coverPath: company.coverPath ? company.coverPath : '',
      logoPath: company.logoPath ? company.logoPath : '',
      listingPath: company.listingPath
        ? company.listingPath
        : company.coverPath
        ? company.coverPath
        : '',
      photos: company.photos ? company.photos : []
    };

    let doc;
    if (isDraft) {
      doc = db.collection('companyDrafts').doc(company.id);
    } else {
      if (!company.coverPath && !coverImg.value) {
        setLoading(false);
        setError('Could not publish, company must have a cover image');
        return;
      }

      if (!company.logoPath && !logoImg.value) {
        setLoading(false);
        setError('Could not publish, company must have a logo image');
        return;
      }

      if (!industryID) {
        setLoading(false);
        setError('Could not publish, company must be designated an industry');
        return;
      }

      // If a doc is being published, delete its temporary draft
      db.collection('companyDrafts')
        .doc(company.id)
        .delete()
        .then(() => {
          console.log('Deleted Draft');
        });

      doc = db.collection('companies').doc(company.id);
    }
    // after we create or update the doc, we'll have the ID which we need for
    // the images
    doc
      .set(updatedCompany, { merge: true })
      // 1: Upload new images to Firebase storage
      .then(() => {
        const imgUploads = [];

        if (!coverImg.isString) {
          const coverRes = storage
            .ref(`companyCovers/${doc.id}`)
            .put(coverImg.value);
          imgUploads.push(coverRes);
        } else {
          imgUploads.push(null);
        }

        if (!listingImg.isString) {
          const listingRes = storage
            .ref(`companyListings/${doc.id}`)
            .put(listingImg.value);
          imgUploads.push(listingRes);
        } else {
          imgUploads.push(null);
        }

        if (!logoImg.isString) {
          const logoRes = storage
            .ref(`companyLogos/${doc.id}`)
            .put(logoImg.value);
          imgUploads.push(logoRes);
        } else {
          imgUploads.push(null);
        }

        if (photos.length > 0) {
          for (let photo of photos) {
            if (!photo.isString) {
              const fileRes = storage
                .ref(`companyPhotos/${doc.id}/${photo.value.name}`)
                .put(photo.value);
              imgUploads.push(fileRes);
            }
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
            Promise.all(
              newPhotos.map(photo => {
                return photo.ref.getDownloadURL();
              })
            )
          ]);
        }
        return Promise.resolve([newCover, newLogo]);
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
      // 4: Update doc with new deletions (this cannot be done in a single step)
      .then(() => {
        if (photosToDelete.length > 0) {
          return doc.update({
            photos: firebase.firestore.FieldValue.arrayRemove(...photosToDelete)
          });
        }
        return Promise.resolve();
      })
      // 5: Update loading state
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          router.back();
        }, 800);
      });
  };

  // We need to wrap the default image set functions, since the values we load
  // from firestore are filepath values, whereas the values we update it
  // with are uploaded blobs
  const updateCover = coverBlob =>
    setCoverImg({ isString: false, value: coverBlob });
  const updateListing = listingBlob =>
    setListingImg({ isString: false, value: listingBlob });
  const updateLogo = logoBlob =>
    setLogoImg({ isString: false, value: logoBlob });
  const updatePhotos = photoBlobs =>
    setPhotos(photoBlobs.map(blob => ({ isString: false, value: blob })));

  return (
    <Form
      onSubmit={onSubmit}
      toggleDraft={toggleDraft}
      success={success}
      error={error}
      loading={loading || loadingIndustries}
      onCancel={()=>router.back()}
      coverImg={coverImg.value}
      setCoverImg={updateCover}
      listingImg={listingImg.value}
      setListingImg={updateListing}
      logoImg={logoImg.value}
      setLogoImg={updateLogo}
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
      photos={photos.map(photo => photo.value)}
      setPhotos={updatePhotos}
      // This is a no-op since a new company is being created, thus there are
      // no photos yet we could remove from storage
      setPhotosToDelete={setPhotosToDelete}
    />
  );
};

export default EditPageWrapper;
