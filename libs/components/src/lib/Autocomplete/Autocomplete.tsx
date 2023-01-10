import React, { FC, useEffect, useState } from 'react';
import {
  Autocomplete as AutocompleteMantine,
  AutocompleteItem,
  AutocompleteProps,
} from '@mantine/core';
import { SelectSharedProps } from '@mantine/core/lib/Select/Select';
import { observer, useField } from '@formily/react';
import { useMutation } from 'react-query';
import { BaseFormItemProps } from '@formily-mantine/cdk';
import { Field } from '@formily/core';
import {
  convertOptions,
  takeMessageForm,
  useDebounce,
} from '@formily-mantine/cdk';

interface ComboBoxProps {
  options: AutocompleteItem[];
  labelProp: string;
  matcherBy: string;
  serverRequest: (search: string) => Promise<AutocompleteItem[]>;
}

const Autocomplete: FC<
  BaseFormItemProps &
    AutocompleteProps &
    SelectSharedProps<AutocompleteItem, AutocompleteItem> &
    ComboBoxProps
> = observer((props) => {
  const field = useField<Field>();
  const [options, setOptions] = useState<AutocompleteItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const searchQuery = useDebounce(searchValue, 500);

  useEffect(() => {
    mutate(searchValue);
  }, [searchQuery]);

  const { mutate } = useMutation(props.serverRequest, {
    onSuccess: (response) => {
      setOptions(convertOptions(response, props.matcherBy, props.labelProp));
    },
    onError: () => {
      setOptions([]);
    },
  });
  const onItemSubmit = (value: AutocompleteItem) => {
    props.onChange?.(value);
  };
  return (
    <AutocompleteMantine
      {...props}
      data={options || []}
      onChange={setSearchValue}
      onItemSubmit={onItemSubmit}
      value={searchValue}
      limit={options?.length}
      error={
        field.errors.length > 0 && takeMessageForm(field, props.feedbackText)
      }
    />
  );
});
export default React.memo(Autocomplete);
