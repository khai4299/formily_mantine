import React, { FC } from 'react';
import {
  BaseFormItemProps,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';

import {
  DatePicker as DatePickerMantine,
  DatePickerProps,
} from '@mantine/dates';
import { useField } from '@formily/react';
import { Field } from '@formily/core';

const DatePicker: FC<DatePickerProps & BaseFormItemProps> = (props) => {
  const field = useField<Field>();
  const error = useFieldValidate();
  console.log(field);
  return (
    <DatePickerMantine
      {...props}
      readOnly={!!props.readOnly}
      value={props.value ? new Date(props.value) : null}
      required={field.required}
      error={error && takeMessageForm(field, props.feedbackText)}
    />
  );
};

export default DatePicker;
