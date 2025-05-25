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
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '@/modules/Auth/store/authActions';
import { RootState } from '@/store';
import Typography from '@/component/shared/Typography';
import toast from '@/utils/toast';

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
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [loader, setLoader] = useState(false);

  const updateProfile = async (values: UserProfile) => {
    try {
      setLoader(true)
      await new Promise((resolve, reject) => {
        dispatch(updateUserProfile({ ...currentUser, ...values }, resolve, reject))
      })
      setLoader(false)
    } catch (error: any) {
      toast.error(error?.error?.message || 'Something went wrong')
    }
  };

  return (
    <AppLayout title="Edit Profile" isBack>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        <FormContainer>
          <Form
            initialValues={{
              id: currentUser?.id || 0,
              firstName: currentUser?.firstName || '',
              lastName: currentUser?.lastName || '',
              username: currentUser?.username || '',
              email: currentUser?.email || '',
              passcode: currentUser?.passcode || '',
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
                <Stack direction="row" align='center' justify='space-between' style={{ width: "100%", marginTop: 8 }}>
                  <Typography variant="h3" weight={600} color={theme.colors.text.primary}>Passcode</Typography>
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
