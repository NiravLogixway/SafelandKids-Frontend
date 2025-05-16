import React, { createContext, useContext, useState } from 'react';

const ApplicationContext = createContext({
  loader: true,
  setLoader: (loader: boolean) => { },
});

const AppContext = ({ children }: any) => {
  const [loader, setLoader] = useState(true);

  return (
    <ApplicationContext.Provider
      value={{
        loader,
        setLoader,
      }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default AppContext;

export const useAppContext = () => useContext(ApplicationContext);
