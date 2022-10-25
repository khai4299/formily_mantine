import React, { FC } from 'react';
import { TimeInput as TimeInputMantine, TimeInputProps } from '@mantine/dates';

const TimeInput: FC<TimeInputProps> = (props) => {
  return (
    <TimeInputMantine
      {...props}
      error={props.error && 'The field not should be blank'}
    />
  );
};

export default TimeInput;
