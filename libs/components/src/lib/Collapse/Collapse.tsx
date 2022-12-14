import React, { FC, useState } from 'react';
import {
  ActionIcon,
  Collapse as CollapseMantine,
  CollapseProps,
  Divider,
} from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons';

interface Props {
  label: string;
}

const Collapse: FC<CollapseProps & Props> = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span>{props.label}</span>
        <ActionIcon
          className="absolute top-0 right-0"
          onClick={() => setOpened((prev) => !prev)}
        >
          {!opened && <IconPlus />}
          {opened && <IconMinus />}
        </ActionIcon>
      </div>
      <Divider />
      <CollapseMantine {...props} in={opened}>
        {props.children}
      </CollapseMantine>
    </div>
  );
};

export default Collapse;
