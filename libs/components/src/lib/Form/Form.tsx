import React, { MouseEvent } from 'react';
import {
  createSchemaField,
  FormProvider,
  useFieldSchema,
} from '@formily/react';
import { Form as FormType } from '@formily/core';
import { Checkbox } from '../Checkbox';
import { MultiSelect, Select } from '../Select';
import { ComboBox } from '../ComboBox';
import {
  ColorInput,
  Input,
  NumberInput,
  PasswordInput,
  Textarea,
  TimeInput,
} from '../Input';
import { SharingFile, UploadFile } from '../Files';
import { RepeatItem } from '../RepeatItem';
import { Switch } from '../Switch';
import { DatePicker, DateRangePicker } from '../DatePicker';
import { ISchema } from '@formily/json-schema';
import { Button, LoadingOverlay } from '@mantine/core';
import ValidatorText from './ValidatorText';
import './styles.scss';

interface ISchemaCustom extends ISchema {
  className?: string;
}

interface Props {
  form: FormType;
  schema: ISchemaCustom;
  onSubmit: (data: unknown) => void;
  onCancel?: () => void;
  hideCancelButton?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
}

const Form = ({
  form,
  schema,
  onSubmit,
  onCancel,
  hideCancelButton,
  isLoading,
  isFetching,
}: Props) => {
  const SchemaField = createSchemaField({
    components: {
      Select,
      ComboBox,
      Input,
      NumberInput,
      TimeInput,
      PasswordInput,
      ColorInput,
      Textarea,
      UploadFile,
      SharingFile,
      RepeatItem,
      MultiSelect,
      DatePicker,
      DateRangePicker,
      Checkbox,
      Switch,
      ValidatorText,
    },
  });
  return (
    <div className="relative">
      <LoadingOverlay visible={!!isFetching} overlayBlur={0.5} />
      <div className={schema.className}>
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      </div>
      <div className="flex mt-8 justify-center">
        <Button
          loading={isLoading}
          className="block mx-auto"
          type="submit"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            e.preventDefault();
            form.submit(onSubmit).catch(() => false);
          }}
        >
          Save
        </Button>
        {hideCancelButton && (
          <Button type="submit" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default Form;
