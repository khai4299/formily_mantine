import React, { FC } from 'react';
import {
  NumberInput as NumberInputMantine,
  NumberInputProps,
} from '@mantine/core';

const NumberInput: FC<NumberInputProps> = (props) => {
  return (
    <NumberInputMantine
      {...props}
      parser={(value) =>
        value?.replace(/[^0-9.-]/g, '').replace(/(\..*?)\..*/g, '$1')
      }
      decimalSeparator=","
      hideControls={true}
      error={props.error && 'The field not should be blank'}
    />
  );
};

export default NumberInput;
