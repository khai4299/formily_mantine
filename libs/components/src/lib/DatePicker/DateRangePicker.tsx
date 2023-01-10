import React, { FC } from 'react';
import { BaseFormItemProps, takeMessageForm } from '@formily-mantine/cdk';

import {
  DateRangePicker as DateRangePickerMantine,
  DateRangePickerProps,
} from '@mantine/dates';
import { observer, useField } from '@formily/react';
import { Field } from '@formily/core';

const DateRangePicker: FC<DateRangePickerProps & BaseFormItemProps> = observer(
  (props) => {
    const field = useField<Field>();

    return (
      <DateRangePickerMantine
        {...props}
        value={[
          props.value?.[0] ? new Date(props.value[0]) : null,
          props.value?.[1] ? new Date(props.value[1]) : null,
        ]}
        amountOfMonths={props.amountOfMonths || 2}
        error={
          field.errors.length > 0 && takeMessageForm(field, props.feedbackText)
        }
      />
    );
  }
);

export default DateRangePicker;
