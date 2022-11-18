import React, { FC } from 'react';
import {
  ColorInput as ColorInputMantine,
  ColorInputProps,
} from '@mantine/core';
import { useField } from '@formily/react';
import { Field } from '@formily/core';
import { BaseFormItemProps } from '@formily-mantine/cdk';

const swatches = [
  '#25262b',
  '#868e96',
  '#fa5252',
  '#e64980',
  '#be4bdb',
  '#7950f2',
  '#4c6ef5',
  '#228be6',
  '#15aabf',
  '#12b886',
  '#40c057',
  '#82c91e',
  '#fab005',
  '#fd7e14',
];
const ColorInput: FC<ColorInputProps & BaseFormItemProps> = (props) => {
  const field = useField<Field>();
  return (
    <ColorInputMantine
      {...props}
      swatches={swatches}
      required={field.required}
      readOnly={!!props.readOnly}
      error={props.error && props.feedbackText}
    />
  );
};

export default ColorInput;
