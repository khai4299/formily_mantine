import React, { FC } from 'react';
import {
  NumberInput as NumberInputMantine,
  NumberInputProps,
} from '@mantine/core';
import { useField } from '@formily/react';
import { Field } from '@formily/core';
import {
  BaseFormItemProps,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';

const NumberInput: FC<NumberInputProps & BaseFormItemProps> = (props) => {
  const field = useField<Field>();
  const error = useFieldValidate();

  return (
    <NumberInputMantine
      {...props}
      required={field.required}
      readOnly={!!props.readOnly}
      parser={(value) =>
        value?.replace(/[^0-9.-]/g, '').replace(/(\..*?)\..*/g, '$1')
      }
      decimalSeparator=","
      hideControls={true}
      error={error && takeMessageForm(field, props.feedbackText)}
    />
  );
};

export default NumberInput;
