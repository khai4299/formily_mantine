import React, { FC } from 'react';
import { Switch as SwitchMantine, SwitchProps } from '@mantine/core';
import { observer, useField } from '@formily/react';
import { Field } from '@formily/core';
import { BaseFormItemProps, takeMessageForm } from '@formily-mantine/cdk';

interface Props {
  onChange: (checked: boolean) => void;
}

const Switch: FC<SwitchProps & BaseFormItemProps & Props> = observer(
  (props) => {
    const field = useField<Field>();

    return (
      <div className={props.className}>
        <label className="inline-block text-sm font-medium break-all cursor-default">
          {props.label}
          {field.required && <span className="text-red-500"> *</span>}
        </label>
        <SwitchMantine
          {...props}
          className=""
          checked={!!field.value}
          onChange={(event) => {
            props.onChange?.(event.currentTarget.checked);
          }}
          onLabel={''}
          offLabel={''}
          label={field.value ? props.onLabel : props.offLabel}
          error={
            field.errors.length > 0 &&
            takeMessageForm(field, props.feedbackText)
          }
        />
      </div>
    );
  }
);

export default Switch;
