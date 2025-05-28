import AuthLayout from '@/layouts/AuthLayout';
import React, { useState, useEffect } from 'react';
import { ResetPasswordContainer, StyledInput, ResetButtonContainer, GradientBackground, ResetButtonText } from './styles';
import { useThemeContext } from '@/context/ThemeContext';
import Form from '@/component/shared/Form';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/authActions';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/AuthStack';
import toast from '@/utils/toast';

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ResetPassword'>;

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ResetPassword = (props: any) => {
  const { token } = props.route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
  const { theme } = useThemeContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await new Promise((resolve, reject) => {
        const payload = {
          token,
          password: values.password,
        };
        dispatch(authActions.resetPassword(payload, resolve, reject));
      });
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout isBack navigateLink='Login' title="Reset Password">
      <ResetPasswordContainer>
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }: any) => (
            <>
              <StyledInput
                name="password"
                placeholder="New Password"
                password={!showPassword}
              />
              <StyledInput
                name="confirmPassword"
                placeholder="Confirm Password"
                password={!showConfirmPassword}
              />
              <GradientBackground colors={theme.colors.background.gradient.primary.colors} theme={theme}>
                <ResetButtonContainer loading={isLoading} onPress={handleSubmit}>
                  <ResetButtonText>Reset Password</ResetButtonText>
                </ResetButtonContainer>
              </GradientBackground>
            </>
          )}
        </Form>
      </ResetPasswordContainer>
    </AuthLayout>
  );
};

export default ResetPassword;
