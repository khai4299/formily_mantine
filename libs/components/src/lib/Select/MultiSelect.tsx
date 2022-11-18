import React, { FC, useEffect, useState } from 'react';
import {
  MultiSelect as MultiSelectMantine,
  MultiSelectProps,
  SelectItem,
} from '@mantine/core';
import { useField } from '@formily/react';
import { Field } from '@formily/core';
import { BaseFormItemProps, useDebounce } from '@formily-mantine/cdk';
import { useMutation } from 'react-query';
import { uniqBy } from 'lodash';
import { SelectItem as SelectItemComponent } from '../Select';

interface Props {
  serverRequest: (search: string) => Promise<any[]>;
  labelProp: string;
  matcherBy: string;
  onChange: (value: SelectItem[]) => void;
  options: any[];
}

const MultiSelect: FC<Partial<MultiSelectProps> & BaseFormItemProps & Props> = (
  props
) => {
  const field = useField<Field>();
  const [valuesSelect, setValuesSelect] = useState<SelectItem[]>([]);
  const [options, setOptions] = useState<SelectItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const searchQuery = useDebounce(searchValue, 500);
  useEffect(() => {
    if (props.options) {
      setOptions(props.options);
    }
  }, [props.options]);
  useEffect(() => {
    if (searchQuery) {
      mutate(searchValue);
    }
  }, [searchQuery]);

  const { mutate } = useMutation(props.serverRequest, {
    onSuccess: (response) => {
      setOptions(uniqBy([...response, ...valuesSelect], props.matcherBy));
    },
    onError: () => {
      setOptions([]);
    },
  });
  const onChange = (values: string[]) => {
    const items = values.map((value) => {
      return (
        options.find((option) => option[props.matcherBy] === value) ||
        ({} as SelectItem)
      );
    });
    setValuesSelect(items);
    props.onChange?.(items);
  };
  return (
    <MultiSelectMantine
      {...props}
      itemComponent={SelectItemComponent}
      required={field.required}
      value={valuesSelect.map((value) => value[props.matcherBy])}
      data={options || []}
      limit={options.length}
      onSearchChange={setSearchValue}
      onChange={onChange}
    />
  );
};

export default MultiSelect;
