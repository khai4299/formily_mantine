import React, { FC } from 'react';
import { TimeInput as TimeInputMantine, TimeInputProps } from '@mantine/dates';
import { useField } from '@formily/react';
import { Field } from '@formily/core';
import { BaseFormItemProps } from '@formily-mantine/cdk';

const TimeInput: FC<TimeInputProps & BaseFormItemProps> = (props) => {
  const field = useField<Field>();

  return (
    <TimeInputMantine
      {...props}
      required={field.required}
      error={props.error && props.feedbackText}
    />
  );
};

export default TimeInput;
