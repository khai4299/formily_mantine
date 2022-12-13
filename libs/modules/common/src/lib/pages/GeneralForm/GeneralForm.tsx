import React, { useEffect } from 'react';
import { Form } from '@formily-mantine/components';
import { createForm, Field, onFieldReact } from '@formily/core';
import { isField } from '@formily/core';

import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {
  getDateDifference,
  showNotification,
  uploadFile,
} from '@formily-mantine/cdk';
import { observable } from '@formily/reactive';

import { useMutation, useQuery } from 'react-query';
import {
  getCustomer,
  getEmployee,
  getLevels,
  getOffices,
  getOrgs,
  getRoles,
  getSites,
  getStaff,
  getTitles,
  postEmployee,
} from '../../services';

const form = createForm({
  effects() {
    onFieldReact('jobTitleVietnamese', (field) => {
      if (isField(field)) {
        field.setValue(field.query('jobTitle').get('value'));
      }
    });
    onFieldReact('jobTitle', (field) => {
      if (isField(field)) {
        field.setValue(field.query('jobTitleVietnamese').get('value'));
      }
    });
    onFieldReact('lastWorkingDate', (field) => {
      field.componentProps['minDate'] = field
        .query('seniorityDate')
        .get('value')
        ? new Date(field.query('seniorityDate').get('value'))
        : new Date();
    });
    onFieldReact('seniorityDate', (field) => {
      field.componentProps['maxDate'] = field
        .query('lastWorkingDate')
        .get('value')
        ? new Date(field.query('lastWorkingDate').get('value'))
        : new Date();
    });
    onFieldReact('vCode', (field) => {
      if (isField(field)) {
        field.setValue(
          field.query('cif').get('value') +
            ' ' +
            field.query('lastName').get('value') +
            ' ' +
            field.query('firstName').get('value')
        );
      }
    });
    onFieldReact('bvTime', (field) => {
      const startDate = field.query('seniorityDate').get('value')
        ? new Date(field.query('seniorityDate').get('value'))
        : new Date();
      const endDate = field.query('status').get('value')
        ? new Date()
        : field.query('lastWorkingDate').get('value')
        ? new Date(field.query('lastWorkingDate').get('value'))
        : field.query('seniorityDate').get('value')
        ? new Date(field.query('seniorityDate').get('value'))
        : new Date();
      const { years, months, days } = getDateDifference(startDate, endDate);
      if (isField(field)) {
        field.setValue(
          years + ' year(s), ' + months + ' month(s), ' + days + ' day(s)'
        );
      }
    });
  },
});

const GeneralForm = () => {
  const { data: dataEmployee, isFetching: isFetchingEmployee } = useQuery(
    'employee',
    getEmployee
  );
  const { mutate, isLoading } = useMutation(postEmployee);

  const schema = {
    grid: true,
    properties: {
      status: {
        'x-component': 'Switch',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 2,
        },
        required: true,
        'x-component-props': {
          label: 'Status',
          onLabel: 'Active',
          offLabel: 'Inactive',
          className: 'form-row',
        },
      },
      cif: {
        'x-component': 'Input',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 2,
        },
        'x-component-props': {
          label: 'CIF Number',
          placeholder: 'Enter cif...',
        },
      },
      vCode: {
        'x-component': 'Input',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 4,
        },
        'x-component-props': {
          label: 'Vcode',
          disabled: true,
          placeholder: 'Enter vcode...',
        },
      },
      site: {
        'x-component': 'Select',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 2,
        },
        'x-component-props': {
          label: 'Site',
          placeholder: 'Enter site...',
          labelProp: 'name',
          matcherBy: 'id',
          fetchRequest: getSites,
        },
      },
      firstName: {
        'x-component': 'Input',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 4,
        },
        required: true,
        'x-component-props': {
          label: 'First Name',
          placeholder: 'Enter first name...',
        },
      },
      lastName: {
        'x-component': 'Input',
        required: true,
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 4,
        },
        'x-component-props': {
          label: 'Last Name',
          placeholder: 'Enter last name...',
        },
      },
      fullNameInVietnamese: {
        'x-component': 'Input',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 4,
        },
        required: true,
        'x-component-props': {
          label: 'Vietnamese full name',
          placeholder: 'Enter vietnamese full name...',
        },
      },
      organization: {
        'x-component': 'Select',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 2,
        },
        required: true,
        'x-component-props': {
          label: 'Department',
          placeholder: 'Enter department...',
          fetchRequest: getOrgs,
          labelProp: 'name',
          matcherBy: 'id',
        },
      },
      teamOrSection: {
        'x-component': 'Input',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 2,
        },
        required: true,
        'x-component-props': {
          label: 'Team/Section',
          placeholder: 'Enter team/section...',
          className: 'col-span-2',
        },
      },
      sector: {
        'x-component': 'Input',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 4,
        },
        'x-component-props': {
          label: 'Sector',
          placeholder: 'Enter sector...',
        },
      },
      costCenter: {
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 4,
        },
        'x-component': 'Input',
        'x-component-props': {
          label: 'Cost center',
          placeholder: 'Enter cost center...',
        },
      },
      jobTitle: {
        'x-component': 'Select',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 6,
        },
        required: true,
        'x-component-props': {
          label: 'English job title',
          placeholder: 'Enter job title...',
          fetchRequest: getTitles,
          labelProp: 'name',
          matcherBy: 'id',
        },
      },
      jobTitleVietnamese: {
        'x-component': 'Select',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 6,
        },
        required: true,
        'x-component-props': {
          label: 'Vietnamese job title',
          placeholder: 'Enter vietnamese job title...',
          fetchRequest: getTitles,
          labelProp: 'vietnameseName',
          matcherBy: 'id',
        },
      },
      office: {
        'x-component': 'Select',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 6,
        },
        required: true,
        'x-component-props': {
          label: 'Working place',
          placeholder: 'Enter working place...',
          fetchRequest: getOffices,
          labelProp: 'name',
          matcherBy: 'id',
        },
      },
      customer: {
        'x-component': 'Select',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 6,
        },
        'x-component-props': {
          label: 'Account customer',
          clearable: true,
          placeholder: 'Enter account customer...',
          fetchRequest: getCustomer,
          labelProp: 'name',
          matcherBy: 'id',
        },
      },
      jobLevel: {
        'x-component': 'Select',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 6,
        },
        'x-component-props': {
          label: 'RCS',
          clearable: true,
          placeholder: 'Enter rsc...',
          fetchRequest: getLevels,
          labelProp: 'name',
          matcherBy: 'id',
        },
      },
      staffCategory: {
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 6,
        },
        'x-component': 'Select',
        required: true,
        'x-component-props': {
          label: 'Staff category',
          placeholder: 'Enter staff category...',
          fetchRequest: getStaff,
          labelProp: 'name',
          matcherBy: 'id',
        },
      },
      seniorityDate: {
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 3,
        },
        'x-component': 'DatePicker',
        'x-component-props': {
          label: 'Seniority date',
          placeholder: 'Enter seniority date...',
        },
      },
      bvTime: {
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 3,
        },
        'x-component': 'Input',
        'x-component-props': {
          label: 'BV time',
          placeholder: 'Enter bv time...',
        },
      },
      onboardingDate: {
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 3,
        },
        'x-component': 'DatePicker',
        required: true,
        'x-component-props': {
          label: 'Onboarding date',
          placeholder: 'Enter onboarding date...',
        },
      },
      lastWorkingDate: {
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 3,
        },
        'x-component': 'DatePicker',
        'x-component-props': {
          label: 'Last Working Day',
          placeholder: 'Enter last working date...',
        },
      },
      roles: {
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 6,
        },
        'x-component': 'MultiSelect',
        'x-component-props': {
          required: true,
          label: 'Roles',
          placeholder: 'Enter roles...',
          fetchRequest: getRoles,
          labelProp: 'name',
          disabledProp: 'isDisable',
          matcherBy: 'id',
        },
      },
      image: {
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 6,
        },
        'x-component': 'UploadFile',
        'x-component-props': {
          label: 'Avatar',
          serverRequest: (file: File) =>
            uploadFile('employee', file, false, true),
        },
      },
      attachment: {
        type: 'array',
        'x-decorator': 'Col',
        'x-decorator-props': {
          span: 12,
        },
        'x-component': 'RepeatItem',
        'x-component-props': {
          label: 'Attachments',
          classNameGroup: 'grid grid-cols-3 gap-4',
        },
        items: {
          type: 'void',
          properties: {
            file: {
              'x-component': 'SharingFile',
              'x-component-props': {
                className: 'form-row',
                accept: IMAGE_MIME_TYPE,
                serverRequest: (file: File) =>
                  uploadFile('employee', file, false, true),
              },
            },
          },
        },
      },
    },
  };
  useEffect(() => {
    if (dataEmployee) {
      form.setInitialValues({
        ...dataEmployee,
        status: dataEmployee.status === 1,
      });
    }
  }, [dataEmployee, form]);
  const onSubmit = (formData: Record<string, unknown>) => {
    const payload = {
      ...formData,
      status: formData['status'] ? 1 : -1,
      attachment: ((formData['attachment'] || []) as (string | null)[]).filter(
        (item) => item
      ),
    };
    mutate(payload, {
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: 'Edit employee successfully',
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
      isFetching={isFetchingEmployee}
      isLoading={isLoading}
      onSubmit={onSubmit}
    />
  );
};

export default GeneralForm;
