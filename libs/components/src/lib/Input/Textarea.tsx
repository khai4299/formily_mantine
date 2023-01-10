import React, { FC } from 'react';
import { Textarea as TextareaMantine, TextareaProps } from '@mantine/core';
import { BaseFormItemProps, takeMessageForm } from '@formily-mantine/cdk';
import { observer, useField } from '@formily/react';
import { Field } from '@formily/core';

const Textarea: FC<TextareaProps & BaseFormItemProps> = observer((props) => {
  const field = useField<Field>();

  return (
    <TextareaMantine
      {...props}
      required={field.required}
      error={
        field.errors.length > 0 && takeMessageForm(field, props.feedbackText)
      }
    />
  );
});

export default Textarea;
