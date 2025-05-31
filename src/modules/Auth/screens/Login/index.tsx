import React, { useState, useRef } from 'react';
import AuthLayout from '@/layouts/AuthLayout';
import Form from '@/component/shared/Form';
import { useThemeContext } from '@/context/ThemeContext';
import {
  LoginContainer,
  ForgotPasswordText,
  LoginButtonContainer,
  GradientBackground,
  LoginButtonText,
  RegisterContainer,
  RegisterText,
  RegisterLink,
  StyledInput,
} from './styles';
import * as Yup from 'yup';
import { navigate } from '@/navigation/NavigationService';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authActions';
import { useFocusEffect } from '@react-navigation/native';

// Validation schema
const validationSchema = Yup.object().shape({
  identifier: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const { theme } = useThemeContext();
  const [isLoading, setIsLoading] = useState(false);
  const loginFormRef = useRef<any>(null);

  const initialValues = {
    identifier: '',
    password: '',
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    await new Promise((resolve, reject) => {
      dispatch(login(values, resolve, reject));
    }).finally(() => {
      setIsLoading(false);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      loginFormRef.current?.resetForm();
    }, [])
  );

  return (
    <AuthLayout title="Login">
      <LoginContainer>
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps: any) => {
            loginFormRef.current = formikProps;
            return (
              <>
                <StyledInput
                  name="identifier"
                  placeholder="Email"
                />
                <Form.Field.PasswordInput
                  name="password"
                  placeholder="Password"
                />
                <ForgotPasswordText
                  onPress={() => {
                    navigate('ForgetPassword', {});
                  }}
                >
                  Forgot password?
                </ForgotPasswordText>
                <GradientBackground colors={theme.colors.background.gradient.primary.colors} theme={theme}>
                  <LoginButtonContainer loading={isLoading} onPress={formikProps.handleSubmit}>
                    <LoginButtonText>Login</LoginButtonText>
                  </LoginButtonContainer>
                </GradientBackground>
              </>
            );
          }}
        </Form>

        <RegisterContainer>
          <RegisterText>Don't have a account? </RegisterText>
          <RegisterText
            onPress={() => {
              navigate('Register', {});
            }}
          >
            <RegisterLink>Register</RegisterLink>
          </RegisterText>
        </RegisterContainer>

      </LoginContainer>
    </AuthLayout>
  );
};

export default Login;