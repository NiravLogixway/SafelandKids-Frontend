import React, { createContext, useContext, useState } from 'react';

interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isTabBarVisible: boolean;
  setTabBarVisible: (visible: boolean) => void;
  tabHistory: string[];
  addToTabHistory: (tab: string) => void;
  clearTabHistory: () => void;
}

const TabContext = createContext<TabContextType>({
  activeTab: 'Home',
  setActiveTab: () => { },
  isTabBarVisible: true,
  setTabBarVisible: () => { },
  tabHistory: [],
  addToTabHistory: () => { },
  clearTabHistory: () => { },
});

const TabContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isTabBarVisible, setTabBarVisible] = useState(true);
  const [tabHistory, setTabHistory] = useState<string[]>(['Home']);

  const addToTabHistory = (tab: string) => {
    setTabHistory(prev => [...prev, tab]);
  };

  const clearTabHistory = () => {
    setTabHistory(['Home']);
  };

  return (
    <TabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isTabBarVisible,
        setTabBarVisible,
        tabHistory,
        addToTabHistory,
        clearTabHistory,
      }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => useContext(TabContext);

export default TabContextProvider;
