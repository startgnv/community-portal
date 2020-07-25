import { validate as validateEmailFormat } from 'email-validator';

export const Validators = {
  required: 'REQUIRED',
  email: 'EMAIL'
};

const validateRequired = (field, setError) => () => {
  if (field.length < 1) {
    setError('Required');
    return false;
  }
  setError('');
  return true;
};

const validateEmail = (e, setError) => () => {
  if (!validateEmailFormat(e)) {
    setError('Please enter a valid email');
    return false;
  }
  setError('');
  return true;
};

const validateTrue = (e, setError) => () => {
  setError('');
  return true;
};

export const validate = validators => {
  const validatorFunctions = validators.reduce(
    (acc, [field, errorMsg, ...validationTypes]) => {
      const functions = validationTypes.map(v => {
        switch (v) {
          case 'REQUIRED':
            return validateRequired(field, errorMsg);
          case 'EMAIL':
            return validateEmail(field, errorMsg);
          default:
            return validateTrue(field, errorMsg);
        }
      });

      return [...acc, ...functions];
    },
    []
  );

  const valid = validatorFunctions
    .map(v => v())
    .reduce((acc, v) => acc && v, true);

  return valid;
};
