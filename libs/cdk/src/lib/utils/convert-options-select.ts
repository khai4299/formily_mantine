import { SelectItem } from '@mantine/core';

interface SelectItemProps extends SelectItem {
  id: string;
}

export const convertOptions = (
  options: SelectItemProps[],
  labelProp: string
) => {
  return options.map((option) => {
    return {
      ...option,
      value: option.id,
      label: option[labelProp],
    };
  });
};
