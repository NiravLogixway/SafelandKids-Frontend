import React, { useState } from 'react'
import * as Yup from 'yup'
import Form from '@/component/shared/Form'
import Typography from '@/component/shared/Typography'
import { FormContainer, PasscodeBox } from './styles'
import Stack from '@/component/shared/Stack'
import { UpdateButtonContainer, UpdateButtonText, GradientBackground } from '../Profile/styles'
import { useThemeContext } from '@/context/ThemeContext'
import { FormikHelpers, FormikProps } from 'formik'
import { Pressable } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import toast from '@/utils/toast'
import { removeItem } from '@/utils/localstorage'
import { navigate } from '@/navigation/NavigationService'
import * as appActions from '@/modules/App/store/appActions'
import { updateUserProfile } from '@/modules/Auth/store/authActions'

const PasscodeForm = () => {
  const { theme } = useThemeContext()
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const [loading, setLoading] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const handleSubmitPasscode = (values: any) => {
    if (currentUser?.passcode === values.passcode) {
      removeItem('CURRENT_KID')
      dispatch(appActions.setCurrentKid(null))
      navigate('ChildList', {})
    } else {
      toast.error('Passcode is incorrect')
    }
  }

  const handleUpdateSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    try {
      setLoading(true)
      await new Promise((resolve, reject) => {
        dispatch(updateUserProfile({ ...currentUser, ...values }, resolve, reject))
      })
      setLoading(false)
      setShowUpdateForm(false)
      resetForm()
    } catch (error: any) {
      toast.error(error?.error?.message || 'Something went wrong')
    }
  }

  return (
    <FormContainer>
      <PasscodeBox>
        {!showUpdateForm ? (
          <Form
            initialValues={{ passcode: '' }}
            validationSchema={Yup.object().shape({
              passcode: Yup.string()
                .length(4, 'Passcode must be 4 digits')
                .required('Passcode is required')
            })}
            onSubmit={handleSubmitPasscode}
          >
            {({ handleSubmit }: FormikProps<any>) => (
              <>
                <Typography variant="h5" weight={600} color="primary" align="center" style={{ marginBottom: 12 }}>
                  Enter Passcode
                </Typography>
                <Stack gap={2} style={{ marginBottom: 12 }}>
                  <Form.Field.OtpInput name="passcode" pinCount={4} bgColor={theme.colors.background.primary} color={theme.colors.text.textDrakBlack} errorColor={theme.colors.errorLightText} />
                </Stack>
                <GradientBackground colors={theme.colors.background.gradient.primary.colors} theme={theme}>
                  <UpdateButtonContainer loading={loading} onPress={() => handleSubmit()}>
                    <UpdateButtonText>Submit</UpdateButtonText>
                  </UpdateButtonContainer>
                </GradientBackground>
                <Pressable onPress={() => setShowUpdateForm(true)}>
                  <Typography variant="h4" weight={500} color="primary" align="center" style={{ marginTop: 16 }}>
                    Change Passcode Button
                  </Typography>
                </Pressable>
              </>
            )}
          </Form>
        ) : (
          <Form
            initialValues={{ passcode: '', confirmPasscode: '' }}
            validationSchema={Yup.object().shape({
              passcode: Yup.string()
                .length(4, 'Passcode must be 4 digits')
                .required('Passcode is required'),
              confirmPasscode: Yup.string()
                .oneOf([Yup.ref('passcode')], 'Passcodes must match')
                .required('Confirm passcode is required'),
            })}
            onSubmit={handleUpdateSubmit}
          >
            {({ handleSubmit }: FormikProps<any>) => (
              <>
                <Typography variant="h5" weight={600} color="primary" align="center" style={{ marginBottom: 12 }}>
                  Update Passcode
                </Typography>
                <Stack gap={2} style={{ marginBottom: 12 }}>
                  <Form.Field.OtpInput name="passcode" pinCount={4} bgColor={theme.colors.background.primary} color={theme.colors.text.textDrakBlack} errorColor={theme.colors.errorLightText} />
                </Stack>
                <Typography variant="h5" weight={500} color="primary" align="center" style={{ marginBottom: 8 }}>
                  Confirm Passcode
                </Typography>
                <Stack gap={2} style={{ marginBottom: 16 }}>
                  <Form.Field.OtpInput name="confirmPasscode" pinCount={4} bgColor={theme.colors.background.primary} color={theme.colors.text.textDrakBlack} errorColor={theme.colors.errorLightText} />
                </Stack>
                <GradientBackground colors={theme.colors.background.gradient.primary.colors} theme={theme}>
                  <UpdateButtonContainer loading={loading} onPress={() => handleSubmit()}>
                    <UpdateButtonText>Update Passcode</UpdateButtonText>
                  </UpdateButtonContainer>
                </GradientBackground>
              </>
            )}
          </Form>
        )}
      </PasscodeBox>
    </FormContainer>
  )
}

export default PasscodeForm 