import React, { useState } from 'react';
import {
  Field,
  GeneralField,
  onFieldValidateFailed,
  onFieldValidateSuccess,
} from '@formily/core';
import { useField, useFormEffects } from '@formily/react';

interface Props {
  children: React.ReactElement;
}

const FormItem = ({ children }: Props) => {
  const [errorForm, setErrorForm] = useState(false);
  const field = useField<Field>();
  useFormEffects(() => {
    onFieldValidateSuccess(field.props.name, () => {
      setErrorForm(false);
    });
    onFieldValidateFailed(field.props.name, () => {
      setErrorForm(true);
    });
  });
  return (
    <>
      {React.cloneElement(children, {
        error: errorForm,
        required: field.required,
      })}
    </>
  );
};

export default FormItem;
