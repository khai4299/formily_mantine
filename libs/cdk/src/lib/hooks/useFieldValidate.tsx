import { useState } from 'react';
import { useField, useFormEffects } from '@formily/react';
import {
  ArrayField,
  Field,
  onFieldValidateFailed,
  onFieldValidateSuccess,
} from '@formily/core';

export const useFieldValidate = () => {
  const [error, setError] = useState<boolean>(false);
  const field = useField<Field | ArrayField>();
  useFormEffects(() => {
    onFieldValidateFailed(field.address, (field) => {
      setError(true);
    });
    onFieldValidateSuccess(field.address, () => {
      setError(false);
    });
  });

  return error;
};
