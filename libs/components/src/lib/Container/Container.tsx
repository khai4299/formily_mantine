import { ContainerProps, Container as ContainerMantine } from '@mantine/core';
import React, { FC } from 'react';

const Container: FC<ContainerProps> = (props) => {
  return <ContainerMantine {...props}>{props.children}</ContainerMantine>;
};

export default Container;
