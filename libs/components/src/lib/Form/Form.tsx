import React, { MouseEvent } from 'react';
import { createSchemaField, FormProvider } from '@formily/react';
import { Checkbox } from '../Checkbox';
import { Select, MultiSelect } from '../Select';
import { ComboBox } from '../ComboBox';
import {
  Input,
  NumberInput,
  TimeInput,
  PasswordInput,
  ColorInput,
} from '../Input';
import { UploadFile, SharingFile } from '../Files';
import { RepeatItem } from '../RepeatItem';
import { Switch } from '../Switch';
import { DatePicker, DateRangePicker } from '../DatePicker';
import { ISchema } from '@formily/json-schema';
import { createForm } from '@formily/core';
import { Button } from '@mantine/core';

interface Props {
  schema: ISchema;
  onSubmit: (data: unknown) => void;
  onCancel?: () => void;
  hideCancelButton?: boolean;
}

const Form = ({ schema, onSubmit, onCancel, hideCancelButton }: Props) => {
  const SchemaField = createSchemaField({
    components: {
      Select,
      ComboBox,
      Input,
      NumberInput,
      TimeInput,
      PasswordInput,
      ColorInput,
      UploadFile,
      SharingFile,
      RepeatItem,
      MultiSelect,
      DatePicker,
      DateRangePicker,
      Checkbox,
      Switch,
    },
  });
  const form = createForm();
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    form
      .submit()
      .then((data) => {
        onSubmit(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <div className="flex mt-8 justify-center">
        <Button className="block mx-auto" type="submit" onClick={handleSubmit}>
          Save
        </Button>
        {hideCancelButton && (
          <Button type="submit" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </FormProvider>
  );
};

export default Form;
