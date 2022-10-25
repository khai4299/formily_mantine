import React, { FC } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';

const Input: FC<TextInputProps> = (props) => {
  return (
    <TextInput
      label={props.label}
      required={props.required}
      onChange={(value) => props.onChange?.(value)}
      readOnly={!!props.readOnly}
      placeholder={props.placeholder}
      icon={props.icon}
      error={props.error && 'The field not should be blank'}
    />
  );
};

export default Input;
