import React, { AnchorHTMLAttributes, FC } from 'react';
import { Anchor, AnchorProps } from '@mantine/core';

const Link: FC<AnchorProps & AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props
) => {
  return <Anchor {...props}>{props.children}</Anchor>;
};

export default Link;
