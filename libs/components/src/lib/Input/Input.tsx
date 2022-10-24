import React, { FC, useState } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { useField, useForm, useFormEffects } from '@formily/react';
import {
  onFormSubmit,
  onFormSubmitValidateFailed,
  onFormSubmitValidateSuccess,
  useEffectForm,
} from '@formily/core';

interface ComposedInput {
  label: string;
  placeholder?: string;
  labelClassName?: string;
}

const Input: FC<ComposedInput & TextInputProps> = (props) => {
  return (
    <>
      <span
        className={`${props.labelClassName} ${
          props.required ? 'required' : ''
        }`}
      >
        {props.label}
      </span>
      <TextInput
        onChange={(value) => props.onChange?.(value)}
        readOnly={!!props.readOnly}
        placeholder={props.placeholder}
        icon={props.icon}
      />
    </>
  );
};

export default Input;
