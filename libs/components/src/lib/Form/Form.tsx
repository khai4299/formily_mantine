import React, { MouseEvent } from 'react';
import {
  createSchemaField,
  FormProvider,
  observer,
  RecursionField,
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
import { Button, Grid, LoadingOverlay } from '@mantine/core';
import ValidatorText from './ValidatorText';
import './styles.scss';
import { Collapse } from '../Collapse';

const { Col } = Grid;

interface ISchemaCustom extends ISchema {
  className?: string;
  grid?: boolean;
}

interface Props {
  form: FormType;
  schema: ISchemaCustom;
  onSubmit: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  hideCancelButton?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
}

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
    Grid,
    Col,
    Collapse,
  },
});
const Form = observer(
  ({
    form,
    schema,
    onSubmit,
    onCancel,
    hideCancelButton,
    isLoading,
    isFetching,
  }: Props) => {
    return (
      <div className="relative">
        <LoadingOverlay visible={!!isFetching} overlayBlur={0.5} />
        <FormProvider form={form}>
          {schema.grid && (
            <Grid className={schema.className}>
              <SchemaField schema={schema} />
            </Grid>
          )}
          {!schema.grid && (
            <div className={schema.className}>
              <SchemaField schema={schema} />
            </div>
          )}
        </FormProvider>
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
  }
);
export default Form;
