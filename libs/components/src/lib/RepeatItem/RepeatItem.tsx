import React, { useMemo, useState } from 'react';
import {
  RecursionField,
  useField,
  useFieldSchema,
  useFormEffects,
} from '@formily/react';
import {
  ArrayField as ArrayFieldType,
  onFieldValidateFailed,
  onFieldValidateSuccess,
} from '@formily/core';
import { ActionIcon } from '@mantine/core';
import { FiPlus } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { takeMessageForm } from '@formily-mantine/cdk';

interface Props {
  label: string;
  feedbackText?: string;
  fieldGroupClassName?: string;
}

const RepeatItem = (props: Props) => {
  const fields = useField<ArrayFieldType>();
  const [error, setError] = useState<boolean>(false);
  const [updateFields, setUpdateFields] = useState<boolean>();
  const schema = useFieldSchema();
  const dataSource = useMemo(() => {
    return Array.isArray(fields.value) ? fields.value : [];
  }, [updateFields]);
  useFormEffects(() => {
    onFieldValidateFailed(fields.address, () => {
      setError(true);
    });
    onFieldValidateSuccess(fields.address, () => {
      setError(false);
    });
  });
  return (
    <div className="mantine-1m3pqry">
      <label className="mantine-ittua2 block">
        {props.label}
        {fields.required && <span className="mantine-u5apz8"> *</span>}
      </label>
      <div className={props.fieldGroupClassName}>
        {dataSource?.map((item: any, index: number) => {
          const items = Array.isArray(schema.items)
            ? schema.items[index] || schema.items[0]
            : schema.items;
          return (
            <div className="flex gap-2">
              <RecursionField schema={items!} name={index} />
              <div>
                <ActionIcon
                  className="ml-2 mt-2 mr-2"
                  variant="filled"
                  color="blue"
                  onClick={() => {
                    fields.remove(index);
                    setUpdateFields((prev) => !prev);
                  }}
                >
                  <MdClose />
                </ActionIcon>
              </div>
            </div>
          );
        })}
      </div>
      {/*{error && (*/}
      {/*  <div className="mantine-1oc5s83">*/}
      {/*    {takeMessageForm(fields, props.feedbackText)}*/}
      {/*  </div>*/}
      {/*)}*/}
      <ActionIcon
        className="mt-4"
        variant="filled"
        color="blue"
        onClick={() => {
          fields.push({});
          setUpdateFields((prev) => !prev);
        }}
      >
        <FiPlus />
      </ActionIcon>
    </div>
  );
};

export default RepeatItem;
