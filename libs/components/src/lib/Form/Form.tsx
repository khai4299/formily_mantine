import React, { MouseEvent } from 'react';
import { FormProvider, ISchema, observer } from '@formily/react';
import { Form as FormType, registerValidateRules } from '@formily/core';
import { Button, LoadingOverlay } from '@mantine/core';
import { SchemaField } from './SchemaField';
import { FileUpload } from '@formily-mantine/cdk';

interface Props {
  form: FormType;
  schema: ISchema;
  onSubmit: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  hideCancelButton?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
}

registerValidateRules({
  requiredFile(value: FileUpload) {
    if (!value) return '';
    return value.error ? 'The field value is required' : '';
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
          <SchemaField schema={schema} />
        </FormProvider>
        <div className="flex mt-8 justify-center">
          <Button
            loading={isLoading}
            className="block mx-auto"
            type="submit"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              e.preventDefault();
              form.submit(onSubmit).catch((reason) => {
                console.log(reason);
              });
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
