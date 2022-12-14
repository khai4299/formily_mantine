import React from 'react';
import { Form } from '@formily-mantine/components';
import { createForm } from '@formily/core';

const form = createForm();
const CheckboxForm = () => {
  const schema = {
    properties: {
      layout: {
        type: 'void',
        'x-decorator': 'Container',
        'x-decorator-props': {
          className: 'relative max-w-full',
        },
        properties: {
          general: {
            'x-component': 'Checkbox',
            'x-component-props': {
              label: 'General Information',
            },
            'x-reactions': {
              target: 'firstName',
              fulfill: {
                state: {
                  value: '{{!!$self.value}}',
                },
              },
            },
          },
          collapse: {
            type: 'void',
            'x-decorator': 'Collapse',
            properties: {
              grid: {
                type: 'void',
                'x-decorator': 'SimpleGrid',
                'x-decorator-props': {
                  cols: 5,
                  className: 'mt-2',
                },
                properties: {
                  firstName: {
                    'x-component': 'Checkbox',
                  },
                  lastName: {
                    'x-component': 'Checkbox',
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  const onSubmit = (data: Record<string, unknown>) => {};
  console.log(form.getValuesIn('general'));
  return <Form form={form} schema={schema} onSubmit={onSubmit} />;
};

export default CheckboxForm;
