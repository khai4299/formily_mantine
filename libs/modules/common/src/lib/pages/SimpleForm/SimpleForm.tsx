import React, { useEffect } from 'react';
import { Form } from '@formily-mantine/components';
import { useMutation, useQuery } from 'react-query';
import { getSkill, updateSkill } from '../../services';
import { createForm } from '@formily/core';
import { showNotification } from '@formily-mantine/cdk';

const form = createForm();

const SimpleForm = () => {
  const { data, isFetching } = useQuery('skill', getSkill);
  const { mutate, isLoading } = useMutation(updateSkill);
  const schema = {
    properties: {
      error: {
        'x-component': 'ValidatorText',
      },
      name: {
        required: true,
        'x-component': 'Input',
        'x-component-props': {
          label: 'Name',
          placeholder: `Enter name`,
          className: 'form-row',
        },
      },
      status: {
        'x-component': 'Switch',
        'x-component-props': {
          label: 'Status',
          onLabel: 'Active',
          offLabel: 'Inactive',
          className: 'form-row',
        },
      },
      description: {
        required: true,
        'x-component': 'Textarea',
        'x-component-props': {
          label: 'Description',
          placeholder: `Enter description`,
          className: 'form-row',
        },
      },
    },
  };
  useEffect(() => {
    if (data) {
      form.setInitialValues({ ...data, status: data.status === 2 });
    }
  }, [data]);
  const onSubmit = (formData: any) => {
    const payload = {
      ...formData,
      status: formData.status ? 2 : 1,
    };
    mutate(payload, {
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: 'Edit skill successfully',
        });
      },
      onError: ({ response }: any) => {
        showNotification({
          type: 'error',
          message: response.data.message,
        });
      },
    });
  };
  return (
    <Form
      form={form}
      schema={schema}
      onSubmit={onSubmit}
      isFetching={isFetching}
      isLoading={isLoading}
    />
  );
};

export default SimpleForm;
