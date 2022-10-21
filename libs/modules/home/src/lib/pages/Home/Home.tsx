import { createSchemaField, FormProvider } from '@formily/react';
import { createForm } from '@formily/core';
import React from 'react';
import { ComboBox, Select } from '@formily-mantine/components';
import { searchUsers } from '../../services';
import { BaseUser } from '@formily-mantine/common';
import { useMutation, useQuery } from 'react-query';

const Home = () => {
  const SchemaField = createSchemaField({
    components: {
      Select,
      ComboBox,
    },
  });
  const { data: users } = useQuery('users', () => searchUsers({ search: '' }), {
    refetchOnWindowFocus: false,
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
              options: users,
              labelClassName: 'font-semibold',
              placeholder: `enterSite`,
              required: true,
              labelProp: 'name',
              matcherBy: 'id',
              serverRequest: (search: string) => searchUsers({ search }),
            },
          },
          // users: {
          //   'x-component': 'Select',
          //   'x-component-props': {
          //     label: 'Select box',
          //     options: users,
          //     labelClassName: 'font-semibold',
          //     placeholder: `enterSite`,
          //     required: true,
          //     labelProp: 'name',
          //     matcherBy: 'id',
          //     // serverRequest: (search: string) => searchUsers({ search }),
          //   },
          // },
        },
        // select: {
        //   'x-component': 'Select',
        //   'x-component-props': {
        //     label: 'Select box',
        //     enum: data,
        //     labelClassName: 'font-semibold',
        //     placeholder: `enterSite`,
        //     required: true,
        //     labelProp: 'name',
        //     matcherBy: 'id',
        //   },
        // },
        // select2: {
        //   'x-component': 'Select',
        //   'x-component-props': {
        //     label: 'Select box',
        //     enum: data,
        //     labelClassName: 'font-semibold',
        //     placeholder: `enterSite`,
        //     required: true,
        //     labelProp: 'name',
        //     matcherBy: 'id',
        //   },
        // },

        // },
        // },
      },
    },
  };
  const form = createForm();
  const onSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  };
  return (
    <FormProvider form={form}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <SchemaField schema={schema} />
      <div className="grid grid-cols-2 mt-8">
        <div className="col-span-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.submit(onSubmit);
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
