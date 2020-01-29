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
    companyCategoriesLoading: true
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
          companies: companyRefs.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })),
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
      .catch(() => {});
  };

  setActiveCompany = id => {
    this.setState({ activeCompanyID: id });
  };

  render() {
    const { children } = this.props;
    const {
      jobs,
      companies,
      jobsLoading,
      companiesLoading,
      jobCategories,
      companyCategories
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          jobs,
          companies,
          jobsLoading,
          companiesLoading,
          jobCategories,
          companyCategories
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;
export default AppContext;
