import React, { FC } from 'react';
import { Switch as SwitchMantine, SwitchProps } from '@mantine/core';
import { useField } from '@formily/react';
import { Field } from '@formily/core';
import {
  BaseFormItemProps,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';

interface Props {
  onChange: (checked: boolean) => void;
}

const Switch: FC<SwitchProps & BaseFormItemProps & Props> = (props) => {
  const field = useField<Field>();
  const error = useFieldValidate();
  return (
    <>
      <label className="inline-block text-sm font-medium break-all cursor-default">
        {props.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>
      <SwitchMantine
        {...props}
        checked={!!field.value}
        onChange={(event) => {
          props.onChange?.(event.currentTarget.checked);
        }}
        onLabel={''}
        offLabel={''}
        label={field.value ? props.onLabel : props.offLabel}
        readOnly={!!props.readOnly}
        error={error && takeMessageForm(field, props.feedbackText)}
      />
    </>
  );
};

export default Switch;
