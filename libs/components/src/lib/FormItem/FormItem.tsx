import React, { FC, ReactNode, useState } from 'react';
import {
  IFieldProps,
  onFormSubmitValidateFailed,
  onFormSubmitValidateSuccess,
  useEffectForm,
} from '@formily/core';
import {
  Field,
  useField,
  useForm,
  useFormEffects,
  useParentForm,
} from '@formily/react';

interface Props extends IFieldProps {
  children: any;
}

const FormItem: FC<Props> = (props) => {
  const [errorForm, setErrorForm] = useState(false);
  const field = useField();
  useFormEffects(() => {
    onFormSubmitValidateSuccess((form) => {
      setErrorForm(false);
    });
    onFormSubmitValidateFailed((form) => {
      const error = form.errors.find(
        (error) => error.path === field.props.name
      );
      if (error) {
        setErrorForm(true);
      } else {
        setErrorForm(false);
      }
    });
  });
  return (
    <div>
      <div>
        {props.children &&
          React.cloneElement(props.children, { error: errorForm })}
      </div>
    </div>
  );
};

export default FormItem;
