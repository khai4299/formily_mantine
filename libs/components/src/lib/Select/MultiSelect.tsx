import React, { FC, useEffect, useState } from 'react';
import {
  MultiSelect as MultiSelectMantine,
  MultiSelectProps,
  SelectItem,
} from '@mantine/core';
import { useField } from '@formily/react';
import { Field } from '@formily/core';
import {
  BaseFormItemProps,
  convertOptions,
  takeMessageForm,
  useDebounce,
  useFieldValidate,
} from '@formily-mantine/cdk';
import { useMutation } from 'react-query';
import { uniqBy } from 'lodash';

interface SelectItemProps extends SelectItem {
  id: string;
}

interface Props {
  serverRequest: (search: string) => Promise<any[]>;
  labelProp: string;
  disabledProp?: string;
  matcherBy: string;
  onChange: (value: SelectItemProps[]) => void;
  options: SelectItemProps[];
}

const MultiSelect: FC<Partial<MultiSelectProps> & BaseFormItemProps & Props> = (
  props
) => {
  const field = useField<Field>();
  const error = useFieldValidate();
  const [options, setOptions] = useState<SelectItemProps[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const searchQuery = useDebounce(searchValue, 500);

  const { mutate } = useMutation(props.serverRequest, {
    onSuccess: (response) => {
      const optionsTotal = field.value
        ? uniqBy([...response, ...field.value], props.matcherBy)
        : response;
      setOptions(
        convertOptions(optionsTotal, props.labelProp, props.disabledProp)
      );
    },
    onError: () => {
      setOptions([]);
    },
  });

  useEffect(() => {
    if (props.options) {
      setOptions(
        convertOptions(props.options, props.labelProp, props.disabledProp)
      );
    }
  }, [props.options]);
  useEffect(() => {
    if (searchQuery) {
      mutate(searchValue);
    }
  }, [searchQuery]);

  const onChange = (values: string[]) => {
    const items = values.map((value) => {
      return (
        options.find((option) => option[props.matcherBy] === value) ||
        ({} as SelectItemProps)
      );
    });
    props.onChange?.(items);
  };
  return (
    <MultiSelectMantine
      {...props}
      required={field.required}
      value={
        field.value && field.value.map((value: any) => value[props.matcherBy])
      }
      data={options || []}
      limit={options.length}
      onSearchChange={setSearchValue}
      onChange={onChange}
      nothingFound={'Nothing found'}
      error={error && takeMessageForm(field, props.feedbackText)}
    />
  );
};

export default MultiSelect;
