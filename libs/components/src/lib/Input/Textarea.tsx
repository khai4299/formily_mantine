import React, { FC } from 'react';
import { Textarea as TextareaMantine, TextareaProps } from '@mantine/core';
import {
  BaseFormItemProps,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';
import { useField } from '@formily/react';
import { Field } from '@formily/core';

const Textarea: FC<TextareaProps & BaseFormItemProps> = (props) => {
  const field = useField<Field>();
  const error = useFieldValidate();
  return (
    <TextareaMantine
      {...props}
      withAsterisk={field.required}
      readOnly={!!props.readOnly}
      error={error && takeMessageForm(field, props.feedbackText)}
    />
  );
};

export default Textarea;
