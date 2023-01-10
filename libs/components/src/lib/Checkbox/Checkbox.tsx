import React, { FC } from 'react';
import { Checkbox as CheckboxMantine, CheckboxProps } from '@mantine/core';
import { observer, useField } from '@formily/react';
import { Field } from '@formily/core';
import { BaseFormItemProps, takeMessageForm } from '@formily-mantine/cdk';

interface Props {
  onChange: (checked: boolean) => void;
  labelProps: Record<string, unknown>;
}

const Checkbox: FC<Props & CheckboxProps & BaseFormItemProps> = observer(
  (props) => {
    const field = useField<Field>();

    return (
      <CheckboxMantine
        {...props}
        label={<span {...props.labelProps}>{props.label}</span>}
        checked={!!field.value}
        onChange={(event) => {
          props.onChange(event.currentTarget.checked);
        }}
        required={field.required}
        error={
          field.errors.length > 0 && takeMessageForm(field, props.feedbackText)
        }
      />
    );
  }
);

export default Checkbox;
