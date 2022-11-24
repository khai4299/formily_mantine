import React, { FC } from 'react';
import {
  BaseFormItemProps,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';

import {
  DateRangePicker as DateRangePickerMantine,
  DateRangePickerProps,
} from '@mantine/dates';
import { useField } from '@formily/react';
import { Field } from '@formily/core';

const DateRangePicker: FC<DateRangePickerProps & BaseFormItemProps> = (
  props
) => {
  const field = useField<Field>();
  const error = useFieldValidate();
  return (
    <DateRangePickerMantine
      {...props}
      amountOfMonths={props.amountOfMonths || 2}
      required={field.required}
      readOnly={!!props.readOnly}
      error={error && takeMessageForm(field, props.feedbackText)}
    />
  );
};

export default DateRangePicker;
