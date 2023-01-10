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
  classNameButton: string;
}

const Collapse: FC<CollapseProps & Props> = (props) => {
  const [opened, setOpened] = useState(!!props.defaultChecked);

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <span>{props.label}</span>
        <ActionIcon
          className={props.classNameButton}
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
    </>
  );
};

export default Collapse;
