import React, { FC } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { useField } from '@formily/react';
import { Field } from '@formily/core';
import { BaseFormItemProps } from '@formily-mantine/cdk';

const Input: FC<TextInputProps & BaseFormItemProps> = (props) => {
  const field = useField<Field>();
  return (
    <TextInput
      {...props}
      required={field.required}
      readOnly={!!props.readOnly}
      error={props.error && props.feedbackText}
    />
  );
};

export default Input;
