import React, { FC, useEffect, useState } from 'react';
import {
  MultiSelect as MultiSelectMantine,
  MultiSelectProps,
  SelectItem,
} from '@mantine/core';
import { observer, useField } from '@formily/react';
import { Field } from '@formily/core';
import {
  BaseFormItemProps,
  convertOptions,
  takeMessageForm,
  useDebounce,
} from '@formily-mantine/cdk';
import { useMutation, useQuery } from 'react-query';

interface Props {
  serverRequest: (search: string) => Promise<SelectItem[]>;
  labelProp: string;
  disabledProp?: string;
  matcherBy: string;
  onChange: (value: SelectItem[]) => void;
  options: SelectItem[];
  fetchRequest: () => Promise<SelectItem[]>;
  keyFetch: string;
  value: SelectItem[];
}

const MultiSelect: FC<Partial<MultiSelectProps> & BaseFormItemProps & Props> =
  observer((props) => {
    const field = useField<Field>();
    const [options, setOptions] = useState<SelectItem[]>(
      convertOptions(
        props.options,
        props.matcherBy,
        props.labelProp,
        props.disabledProp
      )
    );
    const [searchValue, setSearchValue] = useState('');
    const searchQuery = useDebounce(searchValue, 500);
    const { data: dataFetch } = useQuery(
      field.props.name.toString(),
      props.fetchRequest
    );
    const { mutate } = useMutation(props.serverRequest, {
      onSuccess: (response) => {
        setOptions(
          convertOptions(
            response,
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
            dataFetch,
            props.matcherBy,
            props.labelProp,
            props.disabledProp
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
        value={
          props.value &&
          props.value.map((value: SelectItem) => value[props.matcherBy])
        }
        data={options || []}
        limit={options.length}
        onSearchChange={setSearchValue}
        onChange={onChange}
        nothingFound={'Nothing found'}
        error={
          field.errors.length > 0 && takeMessageForm(field, props.feedbackText)
        }
      />
    );
  });

export default MultiSelect;
