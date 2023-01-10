import { SelectItem } from '@mantine/core';

export const convertOptions = (
  options: SelectItem[],
  matcherBy: string,
  labelProp: string,
  disabledProps?: string
): SelectItem[] => {
  return options.map((option) => {
    return {
      [matcherBy]: option[matcherBy],
      value: option[matcherBy],
      label: option[labelProp] || '',
      disabled: disabledProps ? option[disabledProps] : option.disabled,
    };
  });
};
