import React, { FC, useRef } from 'react';
import { Formik, Form as FormikForm, Field as FormikField, FormikHelpers } from 'formik';
import { get, mapValues } from 'lodash';
import Field from './Field';
import Spinner from '../Spinner';

interface FormProps {
  children: any;
  initialValues: any;
  validationSchema?: any;
  enableReinitialize?: boolean;
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  loader?: boolean;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

interface FormComponent extends FC<FormProps> {
  Element: any;
  Field: any; // You might want to define the type for Field component as well
  initialValues: (data: any, getFieldValues: any) => any;
}

const Form: FormComponent = ({ initialValues, onSubmit, loader, ...otherProps }) => {
  if (loader) {
    return <Spinner />;
  }

  return <Formik {...otherProps} initialValues={initialValues} onSubmit={onSubmit} />;
};

Form.Element = (props: any) => <FormikForm noValidate {...props} />;

Form.Field = mapValues(Field, (FieldComponent) => ({ name, validate, ...props }: any) => {
  return (
    <FormikField name={name} validate={validate}>
      {({
        field,
        form: { touched, errors, setFieldValue, setFieldTouched, ...otherProp },
      }: any) => {
        return (
          <FieldComponent
            {...field}
            {...props}
            name={name}
            error={get(touched, name) && get(errors, name)}
            onChange={(value: any) => {
              if (props?.onChange && typeof props.onChange === 'function') {
                props.onChange(value);
              }
              setFieldValue(name, value);
            }}
            onBlur={(e: any) => {
              if (props?.onBlur && typeof props.onBlur === 'function') {
                props.onBlur(e.target.value);
              }
              setFieldTouched(name, true);
            }}
          />
        );
      }}
    </FormikField>
  );
});

Form.initialValues = (data: any, getFieldValues) =>
  getFieldValues((key: any, defaultValue = '') => {
    const value = get(data, key);
    return value === undefined || value === null ? defaultValue : value;
  });

export default Form;
