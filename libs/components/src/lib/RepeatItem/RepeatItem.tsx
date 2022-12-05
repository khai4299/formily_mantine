import React, { useMemo, useState } from 'react';
import { RecursionField, useField, useFieldSchema } from '@formily/react';
import { ArrayField as ArrayFieldType } from '@formily/core';
import { ActionIcon } from '@mantine/core';
import { IconX, IconPlus } from '@tabler/icons';

interface Props {
  label: string;
  feedbackText?: string;
  className?: string;
  onRemove?: (index: number) => void;
}

const RepeatItem = (props: Props) => {
  const fields = useField<ArrayFieldType>();
  const [updateFields, setUpdateFields] = useState<boolean>();
  const schema = useFieldSchema();
  const dataSource = Array.isArray(fields.value) ? fields.value : [];
  return (
    <div className={props.className}>
      <label className="mantine-ittua2 block">
        {props.label}
        {fields.required && <span className="mantine-u5apz8"> *</span>}
      </label>
      <div>
        {dataSource?.map((item, index: number) => {
          const items = Array.isArray(schema.items)
            ? schema.items[index] || schema.items[0]
            : schema.items;
          return (
            <div key={index} className="flex gap-2 form-row">
              <RecursionField schema={items!} name={index} />
              <div>
                <ActionIcon
                  className="ml-2 mt-2 mr-2"
                  variant="filled"
                  color="blue"
                  onClick={() => {
                    fields
                      .remove(index)
                      .then(() => {
                        props.onRemove?.(index);
                      })
                      .catch(() => false);

                    setUpdateFields((prev) => !prev);
                  }}
                >
                  <IconX />
                </ActionIcon>
              </div>
            </div>
          );
        })}
      </div>
      <ActionIcon
        className="mt-4"
        variant="filled"
        color="blue"
        onClick={() => {
          fields.push({});
          setUpdateFields((prev) => !prev);
        }}
      >
        <IconPlus />
      </ActionIcon>
    </div>
  );
};

export default RepeatItem;
