import AuthLayout from '@/layouts/AuthLayout'
import React from 'react'
import { ForgetPasswordContainer, ForgetPasswordText } from './style'
import { useThemeContext } from '@/context/ThemeContext';

const ForgetPassword = () => {
  const { theme } = useThemeContext();
  return (
    <AuthLayout isBack title="Forgot Password">
      <ForgetPasswordContainer>

      </ForgetPasswordContainer>
    </AuthLayout>
  )
}

export default ForgetPassword