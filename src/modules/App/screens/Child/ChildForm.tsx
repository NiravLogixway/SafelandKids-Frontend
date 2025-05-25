import React, { useRef, useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { useRoute, RouteProp } from '@react-navigation/native';
import type { ChildStack, MainTab } from '@/navigation/AppStack';
import { useThemeContext } from '@/context/ThemeContext';
import { FormContainer } from '@/component/shared/Form/style';
import Form from '@/component/shared/Form';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import {
  StyledInput,
  UpdateButtonContainer,
  GradientBackground,
  UpdateButtonText,
} from '../Profile/styles';
import { useDispatch } from 'react-redux';
import * as appActions from '../../store/appActions';
import { FormikHelpers } from 'formik';

type ChildFormRouteProp = RouteProp<ChildStack, 'ChildForm'>;

type ChildFormHelpers = FormikHelpers<ChildData>;

interface ChildData {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
}

const ChildForm = (props: any) => {
  const { mode, kid } = props.route.params;
  const dispatch = useDispatch();
  const { theme } = useThemeContext();
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (values: ChildData, { resetForm }: ChildFormHelpers) => {
    setLoader(true);
    await new Promise((resolve, reject) => {
      if (isEdit) {
        dispatch(appActions.updateKid(values, resolve, reject))
      } else {
        dispatch(appActions.addKid(values, resolve, reject))
      }
    })
      .then(() => resetForm())
      .finally(() => setLoader(false));
  };

  const isEdit = mode === 'edit';
  const childName = `${kid?.firstName ?? ""} ${kid?.lastName ?? ""}`.trim();

  return (
    <AppLayout isBack title={mode === 'edit' ? childName : "Add Child"}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        <FormContainer>
          <Form
            initialValues={{
              ...kid,
              firstName: kid?.firstName ?? '',
              lastName: kid?.lastName ?? '',
              age: kid?.age ?? '',
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required('First name is required'),
              lastName: Yup.string().required('Last name is required'),
              age: Yup.string()
                .matches(/^[0-9]+$/, 'Age must be a number')
                .required('Age is required'),
            })}
            enableReinitialize
            onSubmit={handleSubmit}>
            {({ handleSubmit }: any) => (
              <>
                <StyledInput name="firstName" placeholder="First Name" />
                <StyledInput name="lastName" placeholder="Last Name" />
                <StyledInput
                  name="age"
                  placeholder="Age"
                  keyboardType="numeric"
                />
                <GradientBackground colors={theme.colors.background.gradient.primary.colors} theme={theme}>
                  <UpdateButtonContainer loading={loader} onPress={handleSubmit}>
                    <UpdateButtonText>{isEdit ? 'Update' : 'Add'} Child</UpdateButtonText>
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

export default ChildForm;