import React from 'react';
import { Notification } from '@mantine/core';
import { IconX } from '@tabler/icons';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ValidatorText = ({ value, onChange }: Props) => {
  return (
    <>
      {value && (
        <Notification
          className="my-4 border-none shadow-md bg-red-100"
          icon={<IconX size={18} />}
          color="red"
          onClose={() => onChange('')}
        >
          <span className="text-red-500">{value}</span>
        </Notification>
      )}
    </>
  );
};

export default ValidatorText;
