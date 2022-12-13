import React from 'react';
import { useQuery } from 'react-query';
import { Form } from '@formily-mantine/components';
import { createForm } from '@formily/core';

const form = createForm();
const CheckboxForm = () => {
  const schema = {
    properties: {
      general: {
        type: 'void',
        title: 'Name',
        'x-decorator': 'Collapse',
        properties: {
          firstName: {
            required: true,
            'x-component': 'Input',
            'x-component-props': {
              placeholder: 'firstName',
            },
          },
          lastName: {
            required: true,
            'x-component': 'Input',
          },
        },
      },
    },
  };
  const onSubmit = (data: Record<string, unknown>) => {};
  return <Form form={form} schema={schema} onSubmit={onSubmit} />;
};

export default CheckboxForm;
