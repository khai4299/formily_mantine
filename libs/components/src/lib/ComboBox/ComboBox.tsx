import React, { FC, forwardRef, useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  BaseSelectProps,
  Group,
  Loader,
  SelectItemProps,
  Text,
} from '@mantine/core';
import { debounce } from 'lodash';
import { SelectSharedProps } from '@mantine/core/lib/Select/Select';
import { useForm } from '@formily/react';
import { useMutation } from 'react-query';
import { BaseObject } from '@formily-mantine/common';

interface ItemProps extends AutocompleteItem, BaseObject {}

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
  ComboBoxProps &
    BaseSelectProps &
    SelectSharedProps<AutocompleteItem, AutocompleteItem>
> = (props) => {
  const [options, setOptions] = useState<AutocompleteItem[]>([]);

  const [defaultOptions, setDefaultOptions] = useState<AutocompleteItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation(props.serverRequest, {
    onSuccess: (data) => {
      const optionsRes = data.map((item) => {
        return {
          ...item,
          key: item.id,
          value: item.name,
          label: item[props.labelProp],
        };
      });
      if (!searchValue) {
        setDefaultOptions(optionsRes);
      }
      setIsLoading(false);
      setOptions(optionsRes);
    },
  });
  const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ label, ...propsItem }: SelectItemProps, ref) => (
      <div ref={ref} {...propsItem}>
        <Group noWrap>
          <div>
            <Text size="sm">{label}</Text>
          </div>
        </Group>
      </div>
    )
  );
  const onSearch = (search: string) => {
    if (search) {
      mutate(search);
      console.log(123);
    }
  };
  const debounceDropDown = useRef(
    debounce((nextValue: string) => onSearch(nextValue), 1000)
  ).current;
  useEffect(() => {
    if (props.options) {
      setOptions(
        props.options.map((item) => {
          return {
            ...item,
            key: item.id,
            value: item.name,
            label: item[props.labelProp],
          };
        })
      );
    }
  }, []);
  const { values } = useForm();
  return (
    <>
      <span
        className={`${props.labelClassName} ${
          props.required ? 'required' : ''
        }`}
      >
        {props.label}
      </span>
      <Autocomplete
        itemComponent={SelectItem}
        data={!isLoading ? options : []}
        onChange={(value: string) => {
          if (!value) {
            setOptions(defaultOptions);
          } else {
            setIsLoading(true);
            debounceDropDown(value);
          }
          setSearchValue(value);
        }}
        onItemSubmit={(matcher) => {
          props.onChange?.(matcher);
        }}
        value={searchValue}
        limit={options?.length}
        nothingFound={
          isLoading ? <Loader style={{ margin: 'auto' }} /> : 'No options'
        }
        placeholder={props.placeholder}
      />
    </>
  );
};
export default React.memo(ComboBox);
