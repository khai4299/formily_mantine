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
              options: [
                {
                  id: 'b79eaa33-e872-4d57-bd11-85196097e01c',
                  code: 'RL-2008',
                  name: 'a',
                  description: 'a',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '51d1a3ce-604a-4db7-a628-e19a15c85c55',
                  code: 'RL-2009',
                  name: 'ab',
                  description: 'EPS',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '5619616a-3dc2-47c1-aa45-9b2ab6eebc2c',
                  code: 'RL-0001',
                  name: 'Admin (Investor)',
                  description: '(New) Investor module administrator',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '3a8f26f4-a1fc-4e85-88c2-7fb1443384fb',
                  code: 'RL-0001',
                  name: 'Administrator (Mail)',
                  description: 'Mail module administrator',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'eb3794b5-c6c4-4628-b1f9-6b8467cbd623',
                  code: 'RL-0001',
                  name: 'Admin (Offer)',
                  description: 'new - Offer module admin',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '42fb42ad-b180-4b02-bbdb-c11c9c085285',
                  code: 'RL-0002',
                  name: 'CnB (Offer)',
                  description: 'new',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '54a936ff-f305-4968-80b6-ec8c15a08852',
                  code: 'RL-0012',
                  name: 'Content Admin',
                  description: 'new',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '853df272-9b59-4ab6-b311-0d2c55930633',
                  code: 'RL-0012',
                  name: 'Content Admin BVCorp',
                  description: 'new',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'e29a68a2-4529-4b26-88e6-2d292d640342',
                  code: 'RL-0002',
                  name: 'Coordinator (Mail)',
                  description: 'Mail module coordinator',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'b79f1cf7-8679-404b-a425-9a05fc76e1ae',
                  code: 'RL-0027',
                  name: 'Department head',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '60b9fc3c-50b9-4121-b182-499ba3b5fa1e',
                  code: 'RL-0003',
                  name: 'Department Head (Offer)',
                  description: 'new',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'cfc1ba86-7693-479b-b4fb-bf8dcb4647f8',
                  code: 'RL-2002',
                  name: 'Employee image approve',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'be35a23b-0240-4a61-98be-59246e9e518f',
                  code: 'RL-0005',
                  name: 'GA (Offer)',
                  description: 'new',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'ce7c03a5-b1cd-4d86-912d-bb8c4035f25c',
                  code: 'RL-2003',
                  name: 'GA test report SVM',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '32ee6f1a-d78b-44cd-8594-ac78b928135f',
                  code: 'RL-0010',
                  name: 'HR Interviewer (Offer)',
                  description: 'new',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '2dc2585d-9f69-4aae-9ada-ae23715d7ef7',
                  code: 'RL-0023',
                  name: 'Interviewer',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '344fe49c-9df4-47fa-9bb4-41a6a2ee8697',
                  code: 'RL-2006',
                  name: 'inventory left menu',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'cb0a6ea5-ed77-4401-b30d-3c7af1175cc8',
                  code: 'RL-0003',
                  name: 'Investor (Investor)',
                  description: '(New) Investor/shareholder',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'a4b421af-59f0-47b7-a736-84e6ee6162b5',
                  code: 'RL-2010',
                  name: 'Investor manager role',
                  description: 'include investor module admin, moderator',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '33ca0500-a269-4e0f-a0c4-952f2a13c77f',
                  code: 'M14-0001',
                  name: 'Investor manager role (Employee Mgmt)',
                  description:
                    'Include Investor module Admin, Moderator role. The role is define at Employee Management module side to support access employee data from Investor module',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'c637e0c8-e68d-431f-b45a-14feeb1f764c',
                  code: 'RL-2005',
                  name: 'Investor moderator new',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '0bc59e7e-7795-4bb8-a0c3-c7b17cad5b60',
                  code: 'RL-0007',
                  name: 'IT (Offer)',
                  description: 'new',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '8decbd91-a023-4071-9d56-1e8c2b46e725',
                  code: 'RL-0006',
                  name: 'LnD (Offer)',
                  description: 'new',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '70f92be3-477c-498a-9abc-53d200b2db9f',
                  code: 'RL-0012',
                  name: 'Manager (Offer)',
                  description: 'Manager role',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '6b1e1f26-ff82-4fa8-a513-5ec5996ff824',
                  code: 'RL-0002',
                  name: 'Moderator (Investor)',
                  description: '(New) Investor module moderator',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '005e5428-4df0-48c9-a4c5-82a5435602a9',
                  code: 'RL-0030',
                  name: 'Offer Coordinator',
                  description: 'Use for Offer Management',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'fa0dc4a8-7949-416b-a2e2-7ca7c193290e',
                  code: 'RL-0009',
                  name: 'Offer Coordinator (Offer)',
                  description: 'new',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '16521ff0-a52a-4d95-830d-3f0628ae93c2',
                  code: 'RL-0025',
                  name: 'Offer Management',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'f4fac4ff-f99f-4cb0-aaa8-001e164c0f69',
                  code: 'RL-0008',
                  name: 'Offer Manager (Offer)',
                  description: 'new',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '3b94895a-b9a6-436f-92e0-26d5a23d1515',
                  code: 'RL-2004',
                  name: 'overview inventory',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '98ae9ab5-af0c-4c17-8007-588f78e5779b',
                  code: 'RL-0002',
                  name: 'Project Coordinator',
                  description: 'Project Coordinator',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'd60347c0-0ca0-4de6-b8c9-a2a094740fc2',
                  code: 'RL-0001',
                  name: 'Project Owner',
                  description: 'Project Owner',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '91a6c9f2-2750-4736-aaea-db934bf48131',
                  code: 'RL-0002',
                  name: 'Role admin',
                  description: 'Role admin',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '19208ae7-dd3e-4814-a372-cc564269f6fb',
                  code: 'RL-0019',
                  name: 'Role C&B',
                  description: 'Create new role for team C&B',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'fd5da0be-a8ab-4729-b1af-15eb3fd3a567',
                  code: 'RL-0031',
                  name: 'Role CnB',
                  description: 'Role for CnB',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '63c2b0fa-3dcb-4085-a514-8ba9089de3cd',
                  code: 'RL-2007',
                  name: 'Role Duy Test',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '72faf0ba-3c59-47c9-9b5c-aa88c1825911',
                  code: 'RL-0021',
                  name: 'Role Employee Management',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '9991fa96-0e3e-41c1-98c5-5d11f50abbd2',
                  code: 'RL-0035',
                  name: 'Role EX',
                  description: '[Event]',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'e228c730-1cf3-4441-b263-8aca6d8d1783',
                  code: 'RL-0014',
                  name: 'Role GA',
                  description: ' ',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'd25d2521-2a3d-4b51-8b1e-6a4b5e8d3c94',
                  code: 'RL-0001',
                  name: 'Role HR',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '36cc6433-9a28-42f6-94c7-486cd1a2f8c9',
                  code: 'RL-0039',
                  name: 'Role Investor admin',
                  description: 'Do not edit or delete',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'ffa6b506-40bb-42b5-aa8f-ce24afaa3c91',
                  code: 'RL-2001',
                  name: 'Role Investor User',
                  description: 'Do not edit or delete',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '5bf92622-980c-4280-983d-da97c7f6df40',
                  code: 'RL-0028',
                  name: 'Role IT',
                  description: 'Use for Offer Management, ...',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'cbd1bc0e-8e85-458f-acf6-6b3b7d190b75',
                  code: 'RL-0029',
                  name: 'Role L&D',
                  description: 'Offer Management, ...',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '1c619674-d1e2-4f87-b1a8-9b147d5f7346',
                  code: 'RL-0006',
                  name: 'Role Leaders',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '34e79c51-34e2-415f-b353-d6ca405bb4ec',
                  code: 'RL-0004',
                  name: 'Role manager',
                  description:
                    'role manager for Offer management, do not edit/ delete',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '4fe552ce-d2e4-4b9c-ad6f-cc50cae3ac68',
                  code: 'RL-0040',
                  name: 'Role Moderator',
                  description: 'Do not edit or delete',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '995119a2-adb3-470f-8b8f-1db249eced66',
                  code: 'RL-0018',
                  name: 'Role PJC',
                  description: '[Visitor] do not edit/delete.',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'b0226a80-9c55-4d02-83a9-e63a4d52abeb',
                  code: 'RL-0000',
                  name: 'Role Super Admin',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: true,
                  module: 0,
                },
                {
                  id: '8d734314-5b8e-4fd0-b1f8-f262c5f8dae7',
                  code: 'RL-0022',
                  name: 'Role TA',
                  description: 'role TA',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: 'a3b57479-12ac-4235-b51e-4ba7bcaf98de',
                  code: 'RL-0032',
                  name: 'Role test for DEV',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '3eddc2da-4f90-4335-a5a1-b4b0be49a8a3',
                  code: 'RL-0026',
                  name: 'Role test for QA ',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '035aaa9d-c31f-423c-bcbb-f8d67ef8d6a2',
                  code: 'RL-0037',
                  name: 'Role Test Security',
                  description: '123456789',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '0cdd3824-738b-4d63-a7f0-206dcc7edb9e',
                  code: 'RL-9999',
                  name: 'Role User',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: true,
                  module: 0,
                },
                {
                  id: 'fb633b4e-0f5e-4eea-8b4e-17a63bb5fa88',
                  code: 'RL-0003',
                  name: 'TA',
                  description: 'TA',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '7568b620-885b-449e-8440-594083c4e83d',
                  code: 'RL-0004',
                  name: 'TA (Offer)',
                  description: 'new',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '75fb8c17-b913-4283-9d2c-ce50a4fc2acf',
                  code: 'RL-0011',
                  name: 'Technical Interviewer (Offer)',
                  description: 'new',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '055f788c-dbbe-4336-ab22-4e348e2367a3',
                  code: 'RL-0034',
                  name: 'Test inventory',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '151a7bab-0957-43c8-862b-ee06580b7f75',
                  code: '',
                  name: 'Test View Investor Page',
                  description: 'Test View Investor Page',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
                {
                  id: '167155ad-8784-435b-9123-680b2f69d597',
                  code: 'RL-0003',
                  name: 'User',
                  description: '',
                  state: 1,
                  policies: null,
                  builtin_role: false,
                  module: 0,
                },
              ],
              labelProp: 'name',
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
      // isFetching={isFetchingEmployee}
      // isLoading={isLoading}
      onSubmit={onSubmit}
    />
  );
};

export default GeneralForm;
