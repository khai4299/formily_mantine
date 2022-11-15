import React, { useMemo, useState } from 'react';
import {
  ArrayField,
  RecursionField,
  useField,
  useForm,
  useFieldSchema,
  useFormEffects,
} from '@formily/react';
import {
  ArrayField as ArrayFieldType,
  Field,
  onFieldValidateFailed,
  onFieldValidateSuccess,
} from '@formily/core';
import { Button } from '@mantine/core';
import { FiPlus } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

const RepeatItem = (props: any) => {
  const [errorForm, setErrorForm] = useState(false);
  const fields = useField<ArrayFieldType>();
  const form = useForm();
  useFormEffects(() => {
    // onFieldValidateSuccess(field.props.name, () => {
    //   setErrorForm(false);
    // });
    // onFieldValidateFailed(field.props.name, () => {
    //   setErrorForm(true);
    // });
  });
  const schema = useFieldSchema();
  console.log((schema.items as any)?.[0]);
  const dataSource = Array.isArray(fields.value) ? fields.value : [];
  return (
    <div>
      {dataSource?.map((item: any, index: number) => {
        const items = Array.isArray(schema.items)
          ? schema.items[index] || schema.items[0]
          : schema.items;
        return (
          <div key={index} className="flex">
            <RecursionField schema={items!} name={index} />
            <Button
              onClick={() => {
                fields.remove(index);
                setErrorForm((prev) => !prev);
              }}
            >
              <MdClose />
            </Button>
          </div>
        );
      })}
      <Button
        onClick={() => {
          fields.push('');
          setErrorForm((prev) => !prev);
        }}
      >
        <FiPlus />
      </Button>
    </div>
  );
};

export default RepeatItem;
