import React, { FC } from 'react';
import { TimeInput as TimeInputMantine, TimeInputProps } from '@mantine/dates';
import { useField } from '@formily/react';
import { Field } from '@formily/core';
import {
  BaseFormItemProps,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';

const TimeInput: FC<TimeInputProps & BaseFormItemProps> = (props) => {
  const field = useField<Field>();
  const error = useFieldValidate();

  return (
    <TimeInputMantine
      {...props}
      required={field.required}
      error={error && takeMessageForm(field, props.feedbackText)}
    />
  );
};

export default TimeInput;
