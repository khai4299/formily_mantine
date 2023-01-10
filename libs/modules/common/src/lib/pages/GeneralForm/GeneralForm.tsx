import React, { useEffect } from 'react';
import { Form } from '@formily-mantine/components';
import {
  createForm,
  isField,
  onFieldInputValueChange,
  onFieldReact,
} from '@formily/core';

import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {
  convertFile,
  getDateDifference,
  showNotification,
  uploadFile,
} from '@formily-mantine/cdk';

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
import { ISchema } from '@formily/react';
import { Employee } from '../../types';

const form = createForm({
  effects() {
    onFieldInputValueChange('jobTitleVietnamese', (field, form) => {
      form.setValuesIn('jobTitle', field.value);
    });
    onFieldInputValueChange('jobTitle', (field, form) => {
      form.setValuesIn('jobTitleVietnamese', field.value);
    });
    onFieldReact('lastWorkingDate', (field, form) => {
      const startDate = form.getValuesIn('seniorityDate')
        ? new Date(form.getValuesIn('seniorityDate'))
        : new Date();
      field.componentProps['minDate'] = startDate;

      if (isField(field) && !form.getValuesIn('status')) {
        if (startDate > new Date(field.value)) {
          field.setSelfErrors([
            'Seniority date need to equal or less than last working day',
          ]);
        } else {
          field.setSelfErrors(undefined);
        }
      }
    });
    onFieldReact('seniorityDate', (field, form) => {
      field.componentProps['maxDate'] = form.getValuesIn('lastWorkingDate')
        ? new Date(form.getValuesIn('lastWorkingDate'))
        : new Date();
    });
    onFieldReact('vCode', (field, form) => {
      if (isField(field)) {
        field.setValue(
          form.getValuesIn('cif') +
            form.getValuesIn('lastName') +
            ' ' +
            form.getValuesIn('firstName')
        );
      }
    });
    onFieldReact('bvTime', (field, form) => {
      const startDate = form.getValuesIn('seniorityDate')
        ? new Date(form.getValuesIn('seniorityDate'))
        : new Date();
      const endDate = form.getValuesIn('status')
        ? new Date()
        : form.getValuesIn('lastWorkingDate')
        ? new Date(form.getValuesIn('lastWorkingDate'))
        : form.getValuesIn('seniorityDate')
        ? new Date(form.getValuesIn('seniorityDate'))
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

  const schema: ISchema = {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-decorator': 'Grid',
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
              accept: IMAGE_MIME_TYPE,
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
      },
    },
  };
  useEffect(() => {
    if (dataEmployee) {
      form.setInitialValues({
        ...dataEmployee,
        status: dataEmployee.status === 1,
        jobTitleVietnamese: dataEmployee.jobTitle,
        image: {
          path: dataEmployee.image,
        },
        attachment: ((dataEmployee.attachment || []) as unknown as string[])
          .filter((item) => item)
          .map((item) => convertFile(item)),
      });
    }
  }, [dataEmployee, form]);
  const onSubmit = (formData: Employee) => {
    const payload = {
      ...formData,
      status: formData.status ? 1 : -1,
      image: formData.image.path,
      roles: [
        ...(formData.roles || []),
        ...(dataEmployee?.roles || []).filter((role) => role.isDisable),
      ],
      attachment: (formData.attachment || [])
        .filter((item) => item && !item.error)
        .map((item) => item.path),
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
