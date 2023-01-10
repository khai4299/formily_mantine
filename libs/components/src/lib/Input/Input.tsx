import React, { FC } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { observer, useField } from '@formily/react';
import { Field } from '@formily/core';
import { BaseFormItemProps, takeMessageForm } from '@formily-mantine/cdk';

const Input: FC<TextInputProps & BaseFormItemProps> = observer((props) => {
  const field = useField<Field>();
  return (
    <TextInput
      {...props}
      withAsterisk={field.required}
      error={
        field.errors.length > 0 && takeMessageForm(field, props.feedbackText)
      }
    />
  );
});
export default Input;
