import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {boolean} from 'yup';
import {getItem, removeItem, setItem} from '../utils/localstorage';
import {userProfile} from '../modules/App/actions/user';
import { useAppContext } from './AppContext';

const AuthenticationContext = createContext({
  isAuthentication: false,
  toggleAuthentication: () => {},
  setUserToken: (token: string) => {},
  removeUserToken: () => {},
  userProfileData: {},
  setUserProfileData:(profile: any)=>{},
});

const AuthContext = ({children}: any) => {
  const {setLoader} = useAppContext();
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [userProfileData, setUserProfileData] = useState({});

  useEffect(() => {
    getItem('AUTH_TOKEN').then(token => {
      setIsAuthentication(!!token);
      return token;
    });
  }, []);

  useEffect(() => {
    if (isAuthentication) {
      getUserProfile();
    } else {
      setUserProfileData({});
    }
  }, [isAuthentication]);

  const getUserProfile = async () => {
    const user: any = await userProfile();
    if (user.id) {
      setUserProfileData(user);
    }
    setLoader(false)
  };

  const toggleAuthentication = () => {
    setIsAuthentication(prevState => !prevState);
  };

  const setUserToken = (token: string) => {
    setItem('AUTH_TOKEN', token);
    setIsAuthentication(true);
  };

  const removeUserToken = () => {
    removeItem('AUTH_TOKEN');
    setIsAuthentication(false);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthentication,
        toggleAuthentication,
        setUserToken,
        removeUserToken,
        userProfileData,
        setUserProfileData,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => useContext(AuthenticationContext);
