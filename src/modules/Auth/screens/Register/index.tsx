import AuthLayout from '@/layouts/AuthLayout'
import React, { useState } from 'react'
import { RegisterContainer, StyledInput, RegisterButtonContainer, GradientBackground, RegisterButtonText, RegisterText, TermsText, LinkText } from './style'
import { useThemeContext } from '@/context/ThemeContext';
import Form from '@/component/shared/Form';
import * as Yup from 'yup';
import Stack from '@/component/shared/Stack';
import { ScrollView } from 'react-native-gesture-handler';
import { register } from '../../store/authActions';
import { useDispatch } from 'react-redux';
import { Linking, Pressable, Text } from 'react-native';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  passcode: Yup.string().length(4, 'Passcode must be 4 digits').required('Passcode is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const { theme } = useThemeContext();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    passcode: '',
    username: '',
    password: '',
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    await new Promise((resolve, reject) => {
      dispatch(register(values, resolve, reject));
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <AuthLayout isBack title="Register">
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        <RegisterContainer>
          <RegisterText style={{ marginBottom: theme.spacing.md }}>
            Welcome our platform! Kindly provide your details to move further.
          </RegisterText>
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
          >
            {({ handleSubmit }: any) => (
              <>
                <StyledInput name="firstName" placeholder="FirstName" />
                <StyledInput name="lastName" placeholder="LastName" />
                <StyledInput name="email" placeholder="E-mail" />
                <Stack direction="row" align='center' justify='space-between' style={{ width: "100%", marginTop: 8 }}>
                  <RegisterText variant="h3" >Passcode</RegisterText>
                  <Form.Field.OtpInput name="passcode" pinCount={4} />
                </Stack>
                <StyledInput name="username" placeholder="UserName" />
                <Form.Field.PasswordInput name="password" placeholder="Password" />
                <GradientBackground colors={theme.colors.background.gradient.primary.colors} theme={theme}>
                  <RegisterButtonContainer loading={isLoading} onPress={handleSubmit}>
                    <RegisterButtonText>Create Button</RegisterButtonText>
                  </RegisterButtonContainer>
                </GradientBackground>
              </>
            )}
          </Form>
          <TermsText variant='h5'>
            By click in Register you agree to our{' '}
            <Pressable onPress={() => Linking.openURL('https://safelandkids.com/terms-and-conditions.html')}>
              <LinkText style={{ textDecorationLine: 'underline', marginTop: 4 }}>Terms & Conditions</LinkText>
            </Pressable>
            {' '}and{' '}
            <Pressable onPress={() => Linking.openURL('https://safelandkids.com/privacy-policy.html')}>
              <LinkText style={{ textDecorationLine: 'underline', marginTop: 4 }}>Privacy Policy</LinkText>
            </Pressable>
          </TermsText>
        </RegisterContainer>
      </ScrollView>
    </AuthLayout >
  )
}

export default Register