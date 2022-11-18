import React, { useState } from 'react';
import {
  Field as FieldType,
  onFieldValidateFailed,
  onFieldValidateSuccess,
} from '@formily/core';
import { useField, useFormEffects } from '@formily/react';
import { takeMessageForm } from '@formily-mantine/cdk';

interface Props {
  children: React.ReactElement;
  feedbackText?: string;
}

const FormItem = (props: Props) => {
  const [error, setError] = useState<boolean>(false);
  const field = useField<FieldType>();
  useFormEffects(() => {
    onFieldValidateFailed(field.address, () => {
      setError(true);
    });
    onFieldValidateSuccess(field.address, () => {
      setError(false);
    });
  });

  return (
    <>
      {React.cloneElement(props.children, {
        feedbackText: takeMessageForm(field, props.feedbackText),
        error: error,
      })}
    </>
  );
};

export default FormItem;
