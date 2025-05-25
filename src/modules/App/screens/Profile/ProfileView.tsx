import React, { useState } from 'react';
import { ProfileContainer, MenuList, MenuItem, MenuText } from './styles';
import { navigate } from '@/navigation/NavigationService';
import DeleteModal from '../../common/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/modules/Auth/store/authActions';
import * as authActions from '@/modules/Auth/store/authActions';
import { RootState } from '@/store';
import toast from '@/utils/toast';

const ProfileView = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [isAccountDeleteModal, isSetAccountDeleteModal] = useState(false);

  const handleMenuAction = (menu: any) => {
    if (menu.onPress) {
      menu.onPress();
    } else if (menu.navigate) {
      navigate(menu.navigate, {});
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  }

  const deleteAccount = async () => {
    try {
      await new Promise((resolve, reject) => {
        dispatch(authActions.updateUserProfile({ ...currentUser, blocked: true } as any, resolve, reject))
      })
      dispatch(logout());
    } catch (error: any) {
      toast.error(error?.error?.message || 'Something went wrong')
    }
  }

  const toggleDeleteModal = () => {
    isSetAccountDeleteModal(!isAccountDeleteModal);
  }

  const profileMenus = [
    {
      label: 'Edit Profile',
      navigate: 'EditProfile',
    },
    {
      label: 'Delete Account',
      onPress: toggleDeleteModal,
    },
    {
      label: 'Log Out',
      onPress: handleLogout,
    }
  ];

  return (
    <ProfileContainer>
      {profileMenus.map((menu, index) => (
        <MenuList key={index}>
          <MenuItem isLast={profileMenus.length - 1 === index}>
            <MenuText
              isLast={profileMenus.length - 1 === index}
              onPress={() => handleMenuAction(menu)}>
              {menu.label}
            </MenuText>
          </MenuItem>
        </MenuList>
      ))}
      <DeleteModal
        visible={isAccountDeleteModal}
        onDelete={deleteAccount}
        onCancel={toggleDeleteModal}
        title="Are you sure you want to delete this account?"
      />
    </ProfileContainer>
  );
};

export default ProfileView;
