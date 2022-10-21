import React, { FC, forwardRef, useEffect, useState } from 'react';
import {
  Group,
  Select as SelectMantine,
  SelectItem,
  SelectItemProps,
  SelectProps as SelectPropsMantine,
  Text,
} from '@mantine/core';
import { SelectSharedProps } from '@mantine/core/lib/Select/Select';
import { useField, useForm } from '@formily/react';

interface ItemsProps extends SelectItem {
  id: string;
}

interface SelectProps {
  options: ItemsProps[];
  labelClassName?: string;
  placeholder: string;
  required?: boolean;
  labelProp: string;
  matcherBy: string;
}

const Select: FC<
  SelectProps & SelectPropsMantine & SelectSharedProps<SelectItem, SelectItem>
> = (props) => {
  const [options, setOptions] = useState<SelectItem[]>();
  const { getInitialValuesIn, getValuesIn } = useForm();
  const { data, props: propsField } = useField();
  useEffect(() => {
    setOptions(
      props.options?.map((item) => {
        return {
          ...item,
          key: item.id,
          value: item.id,
          label: item[props.labelProp],
        };
      })
    );
  }, [props]);
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
  return (
    <>
      <span
        className={`${props.labelClassName} ${
          props.required ? 'required' : ''
        }`}
      >
        {props.label}
      </span>
      <SelectMantine
        itemComponent={SelectItem}
        data={options || []}
        defaultValue={getValuesIn(propsField.name)?.id}
        onChange={(matcher) => {
          const item = props.options.find(
            (item) => item[props.matcherBy] === matcher
          );
          if (item) {
            props.onChange?.(item);
          }
        }}
        placeholder={props.placeholder}
      />
    </>
  );
};

export default React.memo(Select);
