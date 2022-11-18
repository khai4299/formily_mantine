import { Group, Text } from '@mantine/core';
import React, { forwardRef } from 'react';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  name: string;
  value: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ name, value, ...others }: ItemProps, ref) => (
    <div ref={ref} key={value} {...others}>
      <Group noWrap>
        <div>
          <Text size="xs">{name}</Text>
        </div>
      </Group>
    </div>
  )
);

export default SelectItem;
