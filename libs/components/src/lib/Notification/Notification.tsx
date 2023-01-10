import React, { FC } from 'react';
import {
  Notification as NotificationMantine,
  NotificationProps,
} from '@mantine/core';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Notification: FC<Props & NotificationProps> = (props) => {
  return (
    <>
      {props.value && (
        <NotificationMantine {...props} onClose={() => props.onChange('')}>
          <span className="text-red-500">{props.value}</span>
        </NotificationMantine>
      )}
    </>
  );
};

export default Notification;
