import { SelectItem } from '@mantine/core';

export const convertOptions = (
  options: SelectItem[],
  matcherBy: string,
  labelProp: string,
  disabledProps?: string
) => {
  return options.map((option) => {
    return {
      ...option,
      value: option[matcherBy],
      label: option[labelProp] || '',
      disabled: disabledProps ? option[disabledProps] : option.disabled,
    };
  });
};
