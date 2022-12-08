import React, { FC } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { useField } from '@formily/react';
import { Field } from '@formily/core';
import {
  BaseFormItemProps,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';

const Input: FC<TextInputProps & BaseFormItemProps> = (props) => {
  const field = useField<Field>();
  const error = useFieldValidate();
  return (
    <TextInput
      {...props}
      value={props.value || ''}
      withAsterisk={field.required}
      readOnly={!!props.readOnly}
      error={error && takeMessageForm(field, props.feedbackText)}
    />
  );
};
export default Input;
