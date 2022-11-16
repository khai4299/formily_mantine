import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrayField,
  RecursionField,
  useField,
  useForm,
  useFieldSchema,
  useFormEffects,
  Field,
} from '@formily/react';
import {
  ArrayField as ArrayFieldType,
  onFieldValidateFailed,
  onFieldValidateSuccess,
} from '@formily/core';
import { Button } from '@mantine/core';
import { FiPlus } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { Input } from '../Input';
import { ArrayBaseItem } from '@formily-mantine/components';

const RepeatItem = (props: any) => {
  const [errorForm, setErrorForm] = useState(false);
  const fields = useField<ArrayFieldType>();
  const [updateFields, setUpdateFields] = useState<boolean>();
  // useFormEffects(() => {
  //   onFieldValidateSuccess(fields.props.name, () => {
  //     setErrorForm(false);
  //   });
  //   onFieldValidateFailed(fields.props.name, () => {
  //     setErrorForm(true);
  //   });
  // });
  const schema = useFieldSchema();
  const dataSource = useMemo(() => {
    return Array.isArray(fields.value) ? fields.value : [];
  }, [updateFields]);
  return (
    <div>
      {dataSource?.map((item: any, index: number) => {
        const items = Array.isArray(schema.items)
          ? schema.items[index] || schema.items[0]
          : schema.items;
        return (
          <ArrayBaseItem
            key={index}
            index={index}
            record={() => fields.value?.[index]}
          >
            <RecursionField schema={items!} name={index} />
            <Button
              onClick={() => {
                fields.remove(index);
                setUpdateFields((prev) => !prev);
              }}
            >
              <MdClose />
            </Button>
          </ArrayBaseItem>
        );
      })}
      <Button
        onClick={() => {
          fields.push('');
          setUpdateFields((prev) => !prev);
        }}
      >
        <FiPlus />
      </Button>
    </div>
  );
};

export default RepeatItem;
