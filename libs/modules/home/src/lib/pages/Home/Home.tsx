import { createSchemaField, FormProvider, FormConsumer } from '@formily/react';
import {
  createForm,
  Form,
  IFormState,
  onFormSubmit,
  onFormSubmitValidateFailed,
  onFormSubmitValidateSuccess,
} from '@formily/core';
import React from 'react';
import {
  ComboBox,
  Input,
  NumberInput,
  Select,
  TimeInput,
  FormItem,
} from '@formily-mantine/components';
import { searchUsers } from '../../services';
import { FiClock, FiSearch } from 'react-icons/fi';

const Home = () => {
  const SchemaField = createSchemaField({
    components: {
      Select,
      ComboBox,
      Input,
      NumberInput,
      TimeInput,
      FormItem,
    },
  });
  const schema = {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component-props': {
          labelCol: 6,
          wrapperCol: 10,
          layout: 'vertical',
        },
        properties: {
          reportTo: {
            'x-component': 'ComboBox',
            'x-component-props': {
              label: 'Select box',
              labelClassName: 'font-semibold',
              placeholder: `enterSite`,
              required: true,
              labelProp: 'name',
              matcherBy: 'id',
              serverRequest: (search: string) => searchUsers({ search }),
            },
          },
          name: {
            'x-component': 'Input',
            'x-decorator': 'FormItem',

            'x-validator': {
              required: true,
            },
            required: true,
            'x-component-props': {
              label: 'Select box',
              labelClassName: 'font-semibold',
              placeholder: `enterSite`,
              required: true,
              icon: <FiSearch />,
            },
          },
          age: {
            'x-component': 'NumberInput',
            'x-component-props': {
              label: 'Age',
              labelClassName: 'font-semibold',
              placeholder: `enterSite`,
              required: true,
              precision: 2,
              icon: <FiSearch />,
            },
          },
          birthDay: {
            'x-component': 'TimeInput',
            'x-validator': {
              required: true,
            },
            required: true,
            'x-decorator': 'FormItem',
            'x-component-props': {
              label: 'Birthday',
              required: true,
              labelClassName: 'font-semibold',
              placeholder: `enterSite`,
              icon: <FiClock />,
            },
          },
        },
      },
    },
  };
  const form = createForm();
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
                .then(() => {})
                .catch(() => {});
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
