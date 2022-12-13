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
import { useMutation, useQuery } from 'react-query';
import { uniqBy } from 'lodash';

interface Props {
  serverRequest: (search: string) => Promise<any[]>;
  labelProp: string;
  disabledProp?: string;
  matcherBy: string;
  onChange: (value: SelectItem[]) => void;
  options: SelectItem[];
  fetchRequest: () => Promise<any[]>;
  keyFetch: string;
}

const MultiSelect: FC<Partial<MultiSelectProps> & BaseFormItemProps & Props> = (
  props
) => {
  const field = useField<Field>();
  const error = useFieldValidate();
  const [options, setOptions] = useState<SelectItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const searchQuery = useDebounce(searchValue, 500);
  const { data: dataFetch } = useQuery(
    field.props.name.toString(),
    props.fetchRequest
  );
  const { mutate } = useMutation(props.serverRequest, {
    onSuccess: (response) => {
      const optionsTotal = field.value
        ? uniqBy([...response, ...field.value], props.matcherBy)
        : response;
      setOptions(
        convertOptions(
          optionsTotal,
          props.matcherBy,
          props.labelProp,
          props.disabledProp
        )
      );
    },
    onError: () => {
      setOptions([]);
    },
  });

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
  useEffect(() => {
    if (searchQuery) {
      mutate(searchValue);
    }
  }, [searchQuery]);

  const onChange = (values: string[]) => {
    const items = values.map((value) => {
      return (
        options.find((option) => option[props.matcherBy] === value) ||
        ({} as SelectItem)
      );
    });
    props.onChange?.(items);
  };
  return (
    <MultiSelectMantine
      {...props}
      required={field.required}
      value={
        field.value &&
        field.value.map((value: SelectItem) => value[props.matcherBy])
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
