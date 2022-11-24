import { createSchemaField, FormProvider } from '@formily/react';
import { createForm } from '@formily/core';
import React from 'react';
import {
  Checkbox,
  ColorInput,
  ComboBox,
  DatePicker,
  DateRangePicker,
  Input,
  MultiSelect,
  NumberInput,
  PasswordInput,
  RepeatItem,
  Select,
  SharingFile,
  Switch,
  TimeInput,
  UploadFile,
} from '@formily-mantine/components';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { uploadFile } from '@formily-mantine/cdk';

const Home = () => {
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
  // const { data } = useQuery('roles', searchUsers);
  const schema = {
    type: 'object',
    properties: {
      date: {
        required: true,
        'x-component': 'DatePicker',
        'x-component-props': {
          label: 'Select box',
          feedbackText: 'The field should be not blank',
          placeholder: `enterSite`,
        },
      },
      dateRange: {
        required: true,
        'x-component': 'DateRangePicker',
        'x-component-props': {
          label: 'Select box',
          feedbackText: 'The field should be not blank',
          placeholder: `enterSite`,
        },
      },
      checkbox: {
        'x-component': 'Checkbox',
        'x-component-props': {
          label: 'Select box',
        },
      },
      switch: {
        'x-component': 'Switch',
        'x-component-props': {
          label: 'Select box',
          onLabel: 'Active',
          offLabel: 'Inactive',
        },
      },
      // attachments: {
      //   type: 'array',
      //   'x-component': 'RepeatItem',
      //   'x-component-props': {
      //     label: 'Attachments',
      //   },
      //   items: {
      //     type: 'void',
      //     properties: {
      //       file: {
      //         required: true,
      //         'x-component': 'SharingFile',
      //         'x-component-props': {
      //           accept: IMAGE_MIME_TYPE,
      //           feedbackText: 'The field should be not blank',
      //           serverRequest: (file: File) =>
      //             uploadFile('employee', file, true, false),
      //         },
      //       },
      //     },
      //   },
      // },
    },
  };
  const form = createForm();
  const onSubmit = (data: unknown) => {
    console.log(data);
  };
  return (
    <FormProvider form={form}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <SchemaField schema={schema} />
      <div className="grid grid-cols-2 mt-8">
        <div className="col-span-1">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form
                .submit()
                .then((data) => {
                  onSubmit(data);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default Home;
