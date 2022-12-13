import React, { FC, useEffect, useState } from 'react';
import {
  Select as SelectMantine,
  SelectItem,
  SelectProps,
} from '@mantine/core';
import { observer, useField } from '@formily/react';
import {
  BaseFormItemProps,
  convertOptions,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';
import { Field } from '@formily/core';
import { useQuery } from 'react-query';

interface Props {
  labelProp: string;
  matcherBy: string;
  onChange: (value: SelectItem) => void;
  options: SelectItem[];
  fetchRequest: () => Promise<any[]>;
  keyFetch: string;
}

const Select: FC<Props & BaseFormItemProps & SelectProps> = observer(
  (props) => {
    const [options, setOptions] = useState<SelectItem[]>([]);
    const field = useField<Field>();
    const error = useFieldValidate();
    const { data: dataFetch } = useQuery(
      field.props.name.toString(),
      props.fetchRequest
    );
    useEffect(() => {
      if (dataFetch) {
        setOptions(
          convertOptions(
            dataFetch as SelectItem[],
            props.matcherBy,
            props.labelProp
          )
        );
      }
    }, [dataFetch]);
    return (
      <SelectMantine
        {...props}
        value={field.value && field.value[props.matcherBy]}
        required={field.required}
        data={options || []}
        nothingFound={'Nothing found'}
        limit={options.length}
        onChange={(matcher) => {
          if (!matcher) {
            props.onChange?.(null);
          } else {
            const item = (dataFetch as SelectItem[])?.find(
              (item) => item[props.matcherBy] === matcher
            );
            if (item) {
              props.onChange?.(item);
            }
          }
        }}
        error={error && takeMessageForm(field, props.feedbackText)}
      />
    );
  }
);

export default Select;
