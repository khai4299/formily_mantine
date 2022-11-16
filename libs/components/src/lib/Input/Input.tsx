import React, { FC } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';

const Input: FC<TextInputProps> = (props) => {
  console.log(props);
  return (
    <TextInput
      {...props}
      onChange={(value) => props.onChange?.(value)}
      readOnly={!!props.readOnly}
      error={props.error && 'The field not should be blank'}
    />
  );
};

export default Input;
