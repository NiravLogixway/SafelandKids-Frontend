import {useState} from 'react';
import {useAuth} from '@/context/AuthContext';

export const useProfile = () => {
  const [isAccountDeleteModal, setIsAccountDeleteModal] = useState(false);
  // const {signOut} = useAuth();

  const toggleDeleteModal = () => {
    setIsAccountDeleteModal(!isAccountDeleteModal);
  };

  const deleteAccount = async () => {
    try {
      // Implement account deletion logic here
      // await signOut();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const logOut = async () => {
    try {
      // await signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return {
    logOut,
    toggleDeleteModal,
    deleteAccount,
    isAccountDeleteModal,
  };
};
