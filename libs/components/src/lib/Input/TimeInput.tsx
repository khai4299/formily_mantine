import React, { FC } from 'react';
import { TimeInput as TimeInputMantine, TimeInputProps } from '@mantine/dates';
import { useForm, useParentForm } from '@formily/react';
import { useEffectForm, onFormSubmit } from '@formily/core';

interface ComposedInput {
  label: string;
  placeholder?: string;
  labelClassName?: string;
}

const TimeInput: FC<ComposedInput & TimeInputProps> = (props) => {
  return (
    <>
      {/*<span*/}
      {/*  className={`${props.labelClassName} ${*/}
      {/*    props.required ? 'required' : ''*/}
      {/*  }`}*/}
      {/*>*/}
      {/*  {props.label}*/}
      {/*</span>*/}
      <TimeInputMantine
        label={props.label}
        required={props.required}
        onChange={(value) => props.onChange?.(value)}
        placeholder={props.placeholder}
        withSeconds={props.withSeconds}
        icon={props.icon}
        clearable
        error={props.error ? 'The field not should be blank' : ''}
      />
    </>
  );
};

export default TimeInput;
