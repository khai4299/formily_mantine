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
  MultiSelect,
} from '@formily-mantine/components';
import { getRoles, searchUsers } from '../../services';
import { FiClock, FiSearch } from 'react-icons/fi';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useQuery } from 'react-query';

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
      MultiSelect,
    },
  });
  // const { data } = useQuery('roles', searchUsers);
  const schema = {
    type: 'object',
    properties: {
      reportTo: {
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'MultiSelect',
        'x-component-props': {
          label: 'Select box',
          placeholder: `enterSite`,
          labelProp: 'name',
          matcherBy: 'id',
          searchable: true,
          serverRequest: (search: string) => searchUsers({ search }),
        },
      },
      name: {
        type: 'string',
        required: true,
        'x-component': 'ComboBox',
        'x-decorator': 'FormItem',
        'x-component-props': {
          label: 'Select box',
          feedbackText: 'The field should be not blank',
          placeholder: `enterSite`,
          icon: <FiSearch />,
          labelProp: 'name',
          matcherBy: 'id',
          serverRequest: (search: string) => searchUsers({ search }),
        },
      },
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
      // attachments: {
      //   type: 'array',
      //   'x-component': 'RepeatItem',
      //   'x-component-props': {
      //     label: 'Attachments',
      //     fieldGroupClassName: 'grid grid-cols-3 gap-4',
      //   },
      //   // required: true,
      //   items: {
      //     type: 'void',
      //     properties: {
      //       test: {
      //         type: 'object',
      //         properties: {
      //           file: {
      //             required: true,
      //             'x-decorator': 'FormItem',
      //             'x-component': 'SharingFile',
      //           },
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
