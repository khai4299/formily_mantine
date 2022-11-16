import React, { useState } from 'react';
import {
  Field as FieldType,
  onFieldValidateFailed,
  onFieldValidateSuccess,
} from '@formily/core';
import { Field, JSXComponent, useField, useFormEffects } from '@formily/react';

interface Props {
  children: React.ReactElement;
}

const FormItem = ({ children }: Props) => {
  const [errorForm, setErrorForm] = useState(false);
  const field = useField<FieldType>();
  useFormEffects(() => {
    onFieldValidateSuccess(field.props.name, () => {
      setErrorForm(false);
    });
    onFieldValidateFailed(field.props.name, () => {
      setErrorForm(true);
    });
  });
  return <>{children}</>;
};

export default FormItem;
