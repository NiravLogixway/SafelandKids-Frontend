import React, { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { ProfileContainer, MenuList, MenuItem, MenuText } from './styles';
import { navigate } from '@/navigation/NavigationService';
import DeleteModal from '../../common/DeleteModal';
import { useDispatch } from 'react-redux';
import { logout } from '@/modules/Auth/store/authActions';


const ProfileView = () => {
  const dispatch = useDispatch();
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

  const deleteAccount = () => {
    dispatch(logout());
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
