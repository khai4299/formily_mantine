import React, { FC } from 'react';
import {
  PasswordInput as PasswordInputMantine,
  PasswordInputProps,
} from '@mantine/core';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInput: FC<PasswordInputProps> = (props) => {
  return (
    <PasswordInputMantine
      {...props}
      error={props.error && 'The field not should be blank'}
      visibilityToggleIcon={({ reveal, size }) =>
        reveal ? <FiEye size={size} /> : <FiEyeOff size={size} />
      }
    />
  );
};

export default PasswordInput;
