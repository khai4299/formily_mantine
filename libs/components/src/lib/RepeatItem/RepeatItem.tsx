import React, { useMemo, useState } from 'react';
import { RecursionField, useField, useFieldSchema } from '@formily/react';
import { ArrayField as ArrayFieldType } from '@formily/core';
import { ActionIcon } from '@mantine/core';
import { IconX, IconPlus } from '@tabler/icons';
import { isEmpty } from 'lodash';

interface Props {
  label: string;
  feedbackText?: string;
  className?: string;
  classNameGroup?: string;
  onRemove?: (index: number) => void;
}

const RepeatItem = (props: Props) => {
  const fields = useField<ArrayFieldType>();
  const schema = useFieldSchema();
  const dataSource = useMemo(() => {
    return Array.isArray(fields.value) ? fields.value : [];
  }, [fields]);
  return (
    <div className={props.className}>
      <label className="inline-block text-sm font-medium break-all cursor-default">
        {props.label}
        {fields.required && <span className="text-red-500"> *</span>}
      </label>
      <div className={props.classNameGroup}>
        {dataSource?.map((item, index: number) => {
          const items = Array.isArray(schema.items)
            ? schema.items[index] || schema.items[0]
            : schema.items;
          return (
            <div key={index} className="flex gap-2">
              <RecursionField schema={items!} name={index} />
              <div className="flex items-center justify-center">
                <ActionIcon
                  variant="filled"
                  color="blue"
                  onClick={() => {
                    fields
                      .remove(index)
                      .then(() => {
                        props.onRemove?.(index);
                      })
                      .catch(() => false);
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
        }}
      >
        <IconPlus />
      </ActionIcon>
    </div>
  );
};

export default RepeatItem;
