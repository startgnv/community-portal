import React from 'react';
import { db } from '../firebase';

const AppContext = new React.createContext();

export class AppProvider extends React.Component {
  state = {
    jobs: [],
    jobsLoading: true,
    companies: [],
    companiesLoading: true,
    jobCategories: [],
    jobCategoriesLoading: true,
    companyCategories: [],
    companyCategoriesLoading: true,
    ecosystem: [],
    ecosystemLoading: true,
    ecosystemCategories: [],
    ecosystemCategoriesLoading: true,
    sidebarOpen: false
  };

  componentDidMount = () => {
    db.collection('jobs')
      .get()
      .then(jobRefs => {
        this.setState({
          jobs: jobRefs.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })),
          jobsLoading: false
        });
      })
      .catch(() => {});
    db.collection('companies')
      .get()
      .then(companyRefs => {
        this.setState({
          companies: companyRefs.docs
            .map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
            .sort((a, b) => {
              const isSponsorA = a.isSponsor;
              const isSponsorB = b.isSponsor;
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();
              if (isSponsorA === isSponsorB) {
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
              } else {
                return isSponsorA ? -1 : 1;
              }
            }),
          companiesLoading: false
        });
      })
      .catch(() => {});
    db.collection('jobCategories')
      .get()
      .then(jobCatRefs => {
        this.setState({
          jobCategories: jobCatRefs.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })),
          jobCategoriesLoading: false
        });
      })
      .catch(() => {});
    db.collection('companyCategories')
      .get()
      .then(companyCatRefs => {
        this.setState({
          companyCategories: companyCatRefs.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })),
          companyCategoriesLoading: false
        });
      })
      .catch(err => {
        console.warn(err);
      });
    db.collection('ecosystem')
      .get()
      .then(ecoRefs => {
        this.setState({
          ecosystem: ecoRefs.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })),
          ecosystemLoading: false
        });
      })
      .catch(() => {});
    db.collection('ecosystemCategories')
      .get()
      .then(ecoCatRefs => {
        this.setState({
          ecosystemCategories: ecoCatRefs.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })),
          ecosystemCategoriesLoading: false
        });
      })
      .catch(err => {
        console.warn(err);
      });
  };

  setActiveCompany = id => {
    this.setState({ activeCompanyID: id });
  };

  openSidebar = () => {
    this.setState({ sidebarOpen: true });
  };

  closeSidebar = () => {
    this.setState({ sidebarOpen: false });
  };

  render() {
    const { children } = this.props;
    const {
      jobs,
      companies,
      jobsLoading,
      companiesLoading,
      jobCategories,
      companyCategories,
      ecosystem,
      ecosystemLoading,
      ecosystemCategories,
      ecosystemCategoriesLoading,
      sidebarOpen
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          jobs,
          companies,
          jobsLoading,
          companiesLoading,
          jobCategories,
          companyCategories,
          ecosystem,
          ecosystemLoading,
          ecosystemCategories,
          ecosystemCategoriesLoading,
          sidebarOpen,
          openSidebar: this.openSidebar,
          closeSidebar: this.closeSidebar
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;
export default AppContext;
