import React from 'react';

const SharedMapContext = React.createContext();

export class SharedMapProvider extends React.Component {
  state = {
    activeCompanyID: ''
  };

  setActiveCompany = id => {
    this.setState({ activeCompanyID: id });
  };

  render() {
    const { children } = this.props;

    return (
      <SharedMapContext.Provider
        value={{
          setActiveCompany: this.setActiveCompany,
          activeCompanyID: this.state.activeCompanyID
        }}
      >
        {children}
      </SharedMapContext.Provider>
    );
  }
}

export const SharedMapConsumer = SharedMapContext.Consumer;
