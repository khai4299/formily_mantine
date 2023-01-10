import React, { FC } from 'react';
import { BaseFormItemProps, takeMessageForm } from '@formily-mantine/cdk';

import {
  DatePicker as DatePickerMantine,
  DatePickerProps,
} from '@mantine/dates';
import { observer, useField } from '@formily/react';
import { Field } from '@formily/core';

const DatePicker: FC<DatePickerProps & BaseFormItemProps> = observer(
  (props) => {
    const field = useField<Field>();

    return (
      <DatePickerMantine
        {...props}
        value={props.value ? new Date(props.value) : null}
        required={field.required}
        error={
          field.errors.length > 0 && takeMessageForm(field, props.feedbackText)
        }
      />
    );
  }
);

export default DatePicker;
