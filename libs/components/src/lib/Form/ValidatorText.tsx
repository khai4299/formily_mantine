import React from 'react';
import { Notification } from '@mantine/core';
import { IoMdClose } from 'react-icons/io';

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
          icon={<IoMdClose size={18} />}
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
