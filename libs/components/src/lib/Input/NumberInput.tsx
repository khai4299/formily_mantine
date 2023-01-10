import React, { FC } from 'react';
import {
  NumberInput as NumberInputMantine,
  NumberInputProps,
} from '@mantine/core';
import { observer, useField } from '@formily/react';
import { Field } from '@formily/core';
import { BaseFormItemProps, takeMessageForm } from '@formily-mantine/cdk';

const NumberInput: FC<NumberInputProps & BaseFormItemProps> = observer(
  (props) => {
    const field = useField<Field>();

    return (
      <NumberInputMantine
        {...props}
        required={field.required}
        parser={(value) =>
          value?.replace(/[^0-9.-]/g, '').replace(/(\..*?)\..*/g, '$1')
        }
        decimalSeparator=","
        hideControls={true}
        error={
          field.errors.length > 0 && takeMessageForm(field, props.feedbackText)
        }
      />
    );
  }
);

export default NumberInput;
