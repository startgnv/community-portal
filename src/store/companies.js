import firebaseClient from 'src/firebase/client';

const getCompanies = async function() {
  try {
    const companies = await firebaseClient.database().ref('companies');
    console.log('companies', companies);
    return [];
    // .then(companyRefs => {
    //   this.setState({
    //     companies: companyRefs.docs
    //       .map(doc => ({
    //         id: doc.id,
    //         ...doc.data()
    //       }))
    //       .sort((a, b) => {
    //         const isSponsorA = a.isSponsor;
    //         const isSponsorB = b.isSponsor;
    //         const nameA = a.name.toUpperCase();
    //         const nameB = b.name.toUpperCase();
    //         if (isSponsorA === isSponsorB) {
    //           return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    //         } else {
    //           return isSponsorA ? -1 : 1;
    //         }
    //       }),
    //     companiesLoading: false
    //   });
    // })
  } catch (err) {
    console.log(err);
    return [];
  }
};

export { getCompanies };
