import AuthLayout from '@/layouts/AuthLayout'
import React, { useState } from 'react'
import { ForgetPasswordContainer, StyledInput, SubmitButtonContainer, GradientBackground, SubmitButtonText, ForgetPasswordText } from './style'
import { useThemeContext } from '@/context/ThemeContext';
import Form from '@/component/shared/Form';
import * as Yup from 'yup';
import * as authActions from '@/modules/Auth/store/authActions';
import { useDispatch } from 'react-redux';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

const ForgetPassword = () => {
  const { theme } = useThemeContext();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: '',
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await new Promise((resolve, reject) => {
        return dispatch(authActions.forgetPassword(values.email, resolve, reject));
      });
    } catch (error) {
      console.error('Forget password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout isBack title="Forgot Password">
      <ForgetPasswordContainer>
        <ForgetPasswordText>
          Enter your email to receive a password reset link.
        </ForgetPasswordText>
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }: any) => (
            <>
              <StyledInput
                name="email"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <GradientBackground colors={theme.colors.background.gradient.primary.colors} theme={theme}>
                <SubmitButtonContainer loading={isLoading} onPress={handleSubmit}>
                  <SubmitButtonText>Send Reset Link</SubmitButtonText>
                </SubmitButtonContainer>
              </GradientBackground>
            </>
          )}
        </Form>
      </ForgetPasswordContainer>
    </AuthLayout>
  )
}

export default ForgetPassword