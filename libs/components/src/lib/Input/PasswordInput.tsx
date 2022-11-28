import React, { FC } from 'react';
import {
  PasswordInput as PasswordInputMantine,
  PasswordInputProps,
} from '@mantine/core';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useField } from '@formily/react';
import { Field } from '@formily/core';
import {
  BaseFormItemProps,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';

const PasswordInput: FC<PasswordInputProps & BaseFormItemProps> = (props) => {
  const field = useField<Field>();
  const error = useFieldValidate();
  return (
    <PasswordInputMantine
      {...props}
      required={field.required}
      readOnly={!!props.readOnly}
      error={error && takeMessageForm(field, props.feedbackText)}
      visibilityToggleIcon={({ reveal, size }) =>
        reveal ? <FiEye size={size} /> : <FiEyeOff size={size} />
      }
    />
  );
};

export default PasswordInput;
