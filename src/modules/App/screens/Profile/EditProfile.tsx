import React, { useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import Form from '@/component/shared/Form';
import * as Yup from 'yup';
import { useThemeContext } from '@/context/ThemeContext';
import { FormContainer } from '@/component/shared/Form/style';
import Button from '@/component/shared/Button';
import { useAuthContext } from '@/context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import Stack from '@/component/shared/Stack';
import {
  StyledInput,
  UpdateButtonContainer,
  GradientBackground,
  UpdateButtonText,
} from './styles';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  passcode: string;
}

const EditProfile = () => {
  const { theme } = useThemeContext();
  const { userProfileData, setUserProfileData } = useAuthContext();
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [loader, setLoader] = useState(false);

  const updateProfile = async (values: UserProfile) => {
    try {
      setLoader(true);
      // Implement profile update logic here
      setUserProfileData(values);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoader(false);
    }
  };

  const profileData = userProfileData as UserProfile;

  return (
    <AppLayout title="Edit Profile" isBack>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        <FormContainer>
          <Form
            initialValues={{
              id: profileData?.id || 0,
              firstName: profileData?.firstName || '',
              lastName: profileData?.lastName || '',
              username: profileData?.username || '',
              email: profileData?.email || '',
              passcode: profileData?.passcode || '',
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required('First name is required'),
              lastName: Yup.string().required('Last name is required'),
              email: Yup.string()
                .email('Please enter a valid email')
                .required('Email is required'),
              username: Yup.string().required('Username is required'),
              passcode: Yup.string()
                .length(4, 'Passcode must be 4 digits')
                .required('Passcode is required'),
            })}
            enableReinitialize
            onSubmit={updateProfile}>
            {({ handleSubmit }: any) => (
              <>
                <StyledInput name="firstName" placeholder="First Name" />
                <StyledInput name="lastName" placeholder="Last Name" />
                <StyledInput name="email" placeholder="E-mail" />
                <Stack direction="row" align='center' justify='space-between' style={{ width: "100%" }}>
                  <Form.Field.OtpInput name="passcode" pinCount={4} />
                </Stack>
                <StyledInput name="username" placeholder="Username" />
                <GradientBackground colors={theme.colors.background.gradient.primary.colors} theme={theme}>
                  <UpdateButtonContainer loading={loader} onPress={handleSubmit}>
                    <UpdateButtonText>Update Profile</UpdateButtonText>
                  </UpdateButtonContainer>
                </GradientBackground>
              </>
            )}
          </Form>
        </FormContainer>
      </ScrollView>
    </AppLayout>
  );
};

export default EditProfile;
