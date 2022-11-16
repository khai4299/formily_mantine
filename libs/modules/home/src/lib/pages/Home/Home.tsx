import { createSchemaField, FormProvider } from '@formily/react';
import { createForm } from '@formily/core';
import React from 'react';
import {
  ColorInput,
  ComboBox,
  UploadFile,
  FormItem,
  Input,
  NumberInput,
  PasswordInput,
  Select,
  TimeInput,
  SharingFile,
  RepeatItem,
  Item,
} from '@formily-mantine/components';
import { searchUsers } from '../../services';
import { FiClock, FiSearch } from 'react-icons/fi';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';

const Home = () => {
  const SchemaField = createSchemaField({
    components: {
      FormItem,
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
      Item,
    },
  });
  const schema = {
    type: 'object',
    properties: {
      // reportTo: {
      //   'x-component': 'ComboBox',
      //   'x-component-props': {
      //     label: 'Select box',
      //     placeholder: `enterSite`,
      //     labelProp: 'name',
      //     matcherBy: 'id',
      //     serverRequest: (search: string) => searchUsers({ search }),
      //   },
      // },
      // name: {
      //   type: 'string',
      //
      //   'x-component': 'Input',
      //   'x-decorator': 'FormItem',
      //   'x-component-props': {
      //     label: 'Select box',
      //     placeholder: `enterSite`,
      //     icon: <FiSearch />,
      //   },
      // },
      // age: {
      //   type: 'string',
      //   'x-component': 'NumberInput',
      //   'x-decorator': 'FormItem',
      //   'x-component-props': {
      //     label: 'Age',
      //     placeholder: `enterSite`,
      //     precision: 2,
      //     icon: <FiSearch />,
      //   },
      // },
      // birthDay: {
      //   'x-component': 'TimeInput',
      //   'x-decorator': 'FormItem',
      //   'x-component-props': {
      //     label: 'Birthday',
      //     clearable: true,
      //     placeholder: `enterSite`,
      //     icon: <FiClock />,
      //   },
      // },
      // password: {
      //   'x-component': 'PasswordInput',
      //   'x-decorator': 'FormItem',
      //   'x-component-props': {
      //     label: 'Password',
      //     placeholder: `enterSite`,
      //     icon: <FiClock />,
      //   },
      // },
      // color: {
      //   'x-component': 'ColorInput',
      //   'x-decorator': 'FormItem',
      //   'x-component-props': {
      //     label: 'Color',
      //     placeholder: `enterSite`,
      //   },
      // },
      // file: {
      //   'x-component': 'UploadFile',
      //   'x-decorator': 'FormItem',
      //   'x-component-props': {
      //     label: 'File',
      //     clearable: true,
      //     accept: IMAGE_MIME_TYPE,
      //     placeholder: `enterFile`,
      //   },
      // },
      files: {
        type: 'array',
        'x-component': 'RepeatItem',
        'x-component-props': {
          label: 'Files',
        },
        items: {
          type: 'object',
          'x-component': 'Item',

          properties: {
            file: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
      },
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
