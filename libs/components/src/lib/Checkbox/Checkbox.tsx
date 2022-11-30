import React, { FC } from 'react';
import { Checkbox as CheckboxMantine, CheckboxProps } from '@mantine/core';
import { useField } from '@formily/react';
import { Field } from '@formily/core';
import {
  BaseFormItemProps,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';

interface Props {
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps & BaseFormItemProps & Props> = (props) => {
  const field = useField<Field>();
  const error = useFieldValidate();
  return (
    <CheckboxMantine
      {...props}
      label={<span className="font-semibold">{props.label}</span>}
      checked={!!field.value}
      onChange={(event) => {
        props.onChange?.(event.currentTarget.checked);
      }}
      required={field.required}
      readOnly={!!props.readOnly}
      error={error && takeMessageForm(field, props.feedbackText)}
    />
  );
};

export default Checkbox;
