import React, { FC } from 'react';
import {
  PasswordInput as PasswordInputMantine,
  PasswordInputProps,
} from '@mantine/core';
import { IconEye, IconEyeOff } from '@tabler/icons';
import { observer, useField } from '@formily/react';
import { Field } from '@formily/core';
import { BaseFormItemProps, takeMessageForm } from '@formily-mantine/cdk';

const PasswordInput: FC<PasswordInputProps & BaseFormItemProps> = observer(
  (props) => {
    const field = useField<Field>();

    return (
      <PasswordInputMantine
        {...props}
        withAsterisk={field.required}
        error={
          field.errors.length > 0 && takeMessageForm(field, props.feedbackText)
        }
        visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <IconEye size={size} /> : <IconEyeOff size={size} />
        }
      />
    );
  }
);

export default PasswordInput;
