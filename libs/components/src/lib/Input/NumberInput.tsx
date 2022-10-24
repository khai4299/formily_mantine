import React, { FC } from 'react';
import {
  NumberInput as NumberInputMantine,
  NumberInputProps,
} from '@mantine/core';

interface ComposedInput {
  label: string;
  placeholder?: string;
  labelClassName?: string;
}

const NumberInput: FC<ComposedInput & NumberInputProps> = (props) => {
  return (
    <>
      <span
        className={`${props.labelClassName} ${
          props.required ? 'required' : ''
        }`}
      >
        {props.label}
      </span>
      <NumberInputMantine
        onChange={(value) => props.onChange?.(value)}
        parser={(value) => {
          value?.replace(/[^0-9.-]/g, '').replace(/(\..*?)\..*/g, '$1');
          return value?.toString();
        }}
        readOnly={!!props.readOnly}
        placeholder={props.placeholder}
        icon={props.icon}
        decimalSeparator=","
        precision={props.precision}
        hideControls={true}
        min={12}
      />
    </>
  );
};

export default NumberInput;
