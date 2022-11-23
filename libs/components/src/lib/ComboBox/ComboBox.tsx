import React, { FC, useEffect, useState } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from '@mantine/core';
import { SelectSharedProps } from '@mantine/core/lib/Select/Select';
import { useField } from '@formily/react';
import { useMutation } from 'react-query';
import { BaseFormItemProps } from '@formily-mantine/common';
import { Field } from '@formily/core';
import { useDebounce } from '@formily-mantine/cdk';

interface ItemProps extends AutocompleteItem {
  id: string;
}

interface ComboBoxProps {
  options: ItemProps[];
  labelClassName?: string;
  placeholder: string;
  required?: boolean;
  labelProp: string;
  matcherBy: string;
  serverRequest: (search: string) => Promise<any[]>;
}

const ComboBox: FC<
  BaseFormItemProps &
    AutocompleteProps &
    SelectSharedProps<AutocompleteItem, AutocompleteItem> &
    ComboBoxProps
> = (props) => {
  const field = useField<Field>();
  const [options, setOptions] = useState<AutocompleteItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const searchQuery = useDebounce(searchValue, 500);

  useEffect(() => {
    mutate(searchValue);
  }, [searchQuery]);

  const { mutate } = useMutation(props.serverRequest, {
    onSuccess: (response) => {
      const optionsRes = response.map((item) => {
        return {
          ...item,
          value: item.name,
          label: item[props.labelProp],
        };
      });
      setOptions(optionsRes);
    },
    onError: () => {
      setOptions([]);
    },
  });
  const onItemSubmit = (value: AutocompleteItem) => {
    props.onChange?.(value);
  };
  return (
    <Autocomplete
      {...props}
      required={field.required}
      data={options || []}
      onChange={setSearchValue}
      onItemSubmit={onItemSubmit}
      value={searchValue}
      limit={options?.length}
      error={props.error && props.feedbackText}
    />
  );
};
export default React.memo(ComboBox);
