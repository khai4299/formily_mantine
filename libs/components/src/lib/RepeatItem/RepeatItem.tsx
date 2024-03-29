import React from 'react';
import {
  observer,
  RecursionField,
  useField,
  useFieldSchema,
} from '@formily/react';
import { ArrayField as ArrayFieldType } from '@formily/core';
import { ActionIcon } from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons';
import { takeMessageForm } from '@formily-mantine/cdk';

interface Props {
  label: string;
  feedbackText?: string;
  className?: string;
  classNameGroup?: string;
  onRemove?: (index: number) => void;
}

const RepeatItem = observer((props: Props) => {
  const fields = useField<ArrayFieldType>();

  const schema = useFieldSchema();
  const dataSource = Array.isArray(fields.value) ? fields.value : [];
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
              <RecursionField key={index} schema={items!} name={index} />
              <div className="flex items-center justify-center">
                <ActionIcon
                  variant="filled"
                  color="blue"
                  onClick={() => {
                    fields.remove(index);
                  }}
                >
                  <IconX />
                </ActionIcon>
              </div>
            </div>
          );
        })}
      </div>
      {fields.errors.length > 0 && (
        <div className="text-xs text-red-500">
          {takeMessageForm(fields, takeMessageForm(fields, props.feedbackText))}
        </div>
      )}
      <ActionIcon
        className="mt-4"
        variant="filled"
        color="blue"
        onClick={() => {
          fields.push(null);
        }}
      >
        <IconPlus />
      </ActionIcon>
    </div>
  );
});

export default RepeatItem;
