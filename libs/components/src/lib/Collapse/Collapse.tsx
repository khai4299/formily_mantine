import React, { FC, useState } from 'react';
import {
  ActionIcon,
  Collapse as CollapseMantine,
  CollapseProps,
} from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons';

const Collapse: FC<CollapseProps> = (props) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <ActionIcon onClick={() => setOpened((prev) => !prev)}>
        {opened && <IconPlus />}
        {!opened && <IconMinus />}
      </ActionIcon>

      <CollapseMantine {...props} in={opened}>
        {props.children}
      </CollapseMantine>
    </>
  );
};

export default Collapse;
