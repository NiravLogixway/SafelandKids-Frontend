const isNilOrEmptyString = (value: any): boolean =>
  value === undefined || value === null || value === '';

export const is = {
  match:
    (testFn: (value: any, fieldValues: any) => boolean, message = '') =>
    (value: any, fieldValues: any) =>
      !testFn(value, fieldValues) && message,

  required: () => (value: any) =>
    isNilOrEmptyString(value) && 'This field is required',

  minLength: (min: number) => (value: any) =>
    !!value && value.length < min && `Must be at least ${min} characters`,

  maxLength: (max: number) => (value: any) =>
    !!value && value.length > max && `Must be at most ${max} characters`,

  notEmptyArray: () => (value: any[]) =>
    Array.isArray(value) &&
    value.length === 0 &&
    'Please add at least one item',

  email: () => (value: string) =>
    !!value && !/.+@.+\..+/.test(value) && 'Must be a valid email',

  url: () => (value: string) =>
    !!value &&
    !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
      value,
    ) &&
    'Must be a valid URL',
};

export const generateErrors = (
  fieldValues: any,
  fieldValidators: {[key: string]: Function | Function[]},
) => {
  const errors: {[key: string]: string} = {};

  Object.entries(fieldValidators).forEach(([fieldName, validators]) => {
    ([validators] as Function[]).flat().forEach((validator: Function) => {
      const errorMessage = validator(fieldValues[fieldName], fieldValues);
      if (errorMessage && !errors[fieldName]) {
        errors[fieldName] = errorMessage;
      }
    });
  });
  return errors;
};
