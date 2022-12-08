import React, { FC, useEffect, useState } from 'react';
import {
  Select as SelectMantine,
  SelectItem,
  SelectProps,
} from '@mantine/core';
import { useField } from '@formily/react';
import {
  BaseFormItemProps,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';
import { Field } from '@formily/core';

interface SelectItemProps extends SelectItem {
  id: string;
}

interface Props {
  serverRequest: (search: string) => Promise<any[]>;
  labelProp: string;
  matcherBy: string;
  onChange: (value: SelectItemProps) => void;
  options: SelectItemProps[];
}

const Select: FC<Props & BaseFormItemProps & SelectProps> = (props) => {
  const [options, setOptions] = useState<SelectItemProps[]>([]);
  const field = useField<Field>();
  const error = useFieldValidate();
  useEffect(() => {
    if (props.options) {
      setOptions(
        props.options.map((option) => {
          return {
            ...option,
            value: option.id,
            label: option[props.labelProp],
          };
        })
      );
    }
  }, [props.options]);
  return (
    <SelectMantine
      {...props}
      value={field.value && field.value.id}
      required={field.required}
      data={options || []}
      nothingFound={'Nothing found'}
      limit={options.length}
      onChange={(matcher) => {
        const item = props.options.find(
          (item) => item[props.matcherBy] === matcher
        );
        if (item) {
          props.onChange?.(item);
        }
      }}
      error={error && takeMessageForm(field, props.feedbackText)}
    />
  );
};

export default Select;
