import React from 'react';
import { Form } from '@formily-mantine/components';
import { createForm } from '@formily/core';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { uploadFile } from '@formily-mantine/cdk';

const form = createForm();

const GeneralForm = () => {
  const schema = {
    className: 'grid grid-cols-12 gap-4',
    properties: {
      // status: {
      //   'x-component': 'Switch',
      //   required: true,
      //   'x-component-props': {
      //     label: 'Status',
      //     onLabel: 'Active',
      //     offLabel: 'Inactive',
      //     className: 'form-row col-span-2',
      //   },
      // },
      // cif: {
      //   'x-component': 'Input',
      //   'x-component-props': {
      //     label: 'CIF Number',
      //     placeholder: 'Enter cif...',
      //     className: 'col-span-2',
      //   },
      // },
      // vCode: {
      //   'x-component': 'Input',
      //   'x-component-props': {
      //     label: 'Vcode',
      //     disabled: true,
      //     placeholder: 'Enter vcode...',
      //     className: 'col-span-4',
      //   },
      // },
      // site: {
      //   'x-component': 'Select',
      //   'x-component-props': {
      //     label: 'Site',
      //     placeholder: 'Enter site...',
      //     className: 'col-span-2',
      //   },
      // },
      // firstName: {
      //   'x-component': 'Input',
      //   required: true,
      //   'x-component-props': {
      //     label: 'First Name',
      //     placeholder: 'Enter first name...',
      //     className: 'col-span-4',
      //   },
      // },
      // lastName: {
      //   'x-component': 'Input',
      //   required: true,
      //   'x-component-props': {
      //     label: 'Last Name',
      //     placeholder: 'Enter last name...',
      //     className: 'col-span-4',
      //   },
      // },
      // fullNameInVietnamese: {
      //   'x-component': 'Input',
      //   required: true,
      //   'x-component-props': {
      //     label: 'Vietnamese full name',
      //     placeholder: 'Enter vietnamese full name...',
      //     className: 'col-span-4',
      //   },
      // },
      // organization: {
      //   'x-component': 'Select',
      //   required: true,
      //   'x-component-props': {
      //     label: 'Department',
      //     placeholder: 'Enter department...',
      //     className: 'col-span-2',
      //   },
      // },
      // section: {
      //   'x-component': 'Input',
      //   required: true,
      //   'x-component-props': {
      //     label: 'Team/Section',
      //     placeholder: 'Enter team/section...',
      //     className: 'col-span-2',
      //   },
      // },
      // sector: {
      //   'x-component': 'Input',
      //   'x-component-props': {
      //     label: 'Sector',
      //     placeholder: 'Enter sector...',
      //     className: 'col-span-4',
      //   },
      // },
      // costCenter: {
      //   'x-component': 'Input',
      //   'x-component-props': {
      //     label: 'Cost center',
      //     placeholder: 'Enter cost center...',
      //     className: 'col-span-4',
      //   },
      // },
      // jobTitle: {
      //   'x-component': 'Select',
      //   required: true,
      //   'x-component-props': {
      //     label: 'English job title',
      //     placeholder: 'Enter job title...',
      //     className: 'col-span-6',
      //   },
      // },
      // jobTitleVietnamese: {
      //   'x-component': 'Select',
      //   required: true,
      //   'x-component-props': {
      //     label: 'Vietnamese job title',
      //     placeholder: 'Enter vietnamese job title...',
      //     className: 'col-span-6',
      //   },
      // },
      // office: {
      //   'x-component': 'Select',
      //   required: true,
      //   'x-component-props': {
      //     label: 'Working place',
      //     placeholder: 'Enter working place...',
      //     className: 'col-span-6',
      //   },
      // },
      // customer: {
      //   'x-component': 'Select',
      //   'x-component-props': {
      //     label: 'Account customer',
      //     clearable: true,
      //     placeholder: 'Enter account customer...',
      //     className: 'col-span-6',
      //   },
      // },
      // jobLevel: {
      //   'x-component': 'Select',
      //   'x-component-props': {
      //     label: 'RCS',
      //     clearable: true,
      //     placeholder: 'Enter rsc...',
      //     className: 'col-span-6',
      //   },
      // },
      // staffCategory: {
      //   'x-component': 'Select',
      //   required: true,
      //   'x-component-props': {
      //     label: 'Staff category',
      //     placeholder: 'Enter staff category...',
      //     className: 'col-span-6',
      //   },
      // },
      // seniorityDate: {
      //   'x-component': 'DatePicker',
      //   'x-component-props': {
      //     label: 'Seniority date',
      //     placeholder: 'Enter seniority date...',
      //     className: 'col-span-3',
      //   },
      // },
      // bvTime: {
      //   'x-component': 'Input',
      //   'x-component-props': {
      //     label: 'BV time',
      //     placeholder: 'Enter bv time...',
      //     className: 'col-span-3',
      //   },
      // },
      // onboardingDate: {
      //   'x-component': 'DatePicker',
      //   required: true,
      //   'x-component-props': {
      //     label: 'Onboarding date',
      //     placeholder: 'Enter onboarding date...',
      //     className: 'col-span-3',
      //   },
      // },
      // lastWorkingDate: {
      //   'x-component': 'DatePicker',
      //   'x-component-props': {
      //     label: 'Last Working Day',
      //     placeholder: 'Enter last working date...',
      //     className: 'col-span-3',
      //   },
      // },
      // roles: {
      //   'x-component': 'MultiSelect',
      //   'x-component-props': {
      //     required: true,
      //     label: 'Roles',
      //     placeholder: 'Enter roles...',
      //     className: 'col-span-6',
      //   },
      // },
      image: {
        'x-component': 'UploadFile',
        'x-component-props': {
          label: 'Avatar',
          className: 'col-span-6',
          accept: IMAGE_MIME_TYPE,
          serverRequest: (file: File) =>
            uploadFile('employee', file, true, false),
        },
      },
      attachments: {
        type: 'array',
        'x-component': 'RepeatItem',
        'x-component-props': {
          label: 'Attachments',
          className: 'col-span-12',
          classNameGroup: 'grid grid-cols-3 gap-4',
        },
        items: {
          type: 'void',
          properties: {
            file: {
              'x-component': 'SharingFile',
              'x-component-props': {
                className: 'form-row',
                serverRequest: (file: File) =>
                  uploadFile('employee', file, true, false),
              },
            },
          },
        },
      },
    },
  };
  const onSubmit = (formData: any) => {
    console.log(formData);
  };
  return <Form form={form} schema={schema} onSubmit={onSubmit} />;
};

export default GeneralForm;
