import React, { FC } from 'react';
import { TimeInput as TimeInputMantine, TimeInputProps } from '@mantine/dates';
import { observer, useField } from '@formily/react';
import { Field } from '@formily/core';
import { BaseFormItemProps, takeMessageForm } from '@formily-mantine/cdk';

const TimeInput: FC<TimeInputProps & BaseFormItemProps> = observer((props) => {
  const field = useField<Field>();

  return (
    <TimeInputMantine
      {...props}
      required={field.required}
      error={
        field.errors.length > 0 && takeMessageForm(field, props.feedbackText)
      }
    />
  );
});

export default TimeInput;
