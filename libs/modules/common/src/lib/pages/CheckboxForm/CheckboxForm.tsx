import React, { MouseEvent, useEffect, useState } from 'react';
import { Checkbox, Container, SchemaField } from '@formily-mantine/components';
import {
  createForm,
  onFieldInputValueChange,
  onFieldValueChange,
} from '@formily/core';
import { Field, FormProvider, ISchema } from '@formily/react';
import { Button } from '@mantine/core';
import { useMutation } from 'react-query';
import { exportExcel } from '../../services';
import FileSaver from 'file-saver';
import { IconFileExport } from '@tabler/icons';

type FieldsType = {
  key: string;
  label: string;
  items: { key: string; label: string; value?: boolean }[];
};
const fields: FieldsType[] = [
  {
    key: 'generalInformation',
    label: 'General Information',
    items: [
      {
        key: 'status',
        label: 'Status',
      },
      {
        key: 'vcode',
        label: 'VCode',
        value: true,
      },
      {
        key: 'cifNumber',
        label: 'CIF',
        value: true,
      },
      {
        key: 'englishName',
        label: 'English Name',
        value: true,
      },
      {
        key: 'vietnameseName',
        label: 'Vietnam Name',
      },
      {
        key: 'site',
        label: 'Site',
      },
      {
        key: 'firstName',
        label: 'First Name',
      },
      {
        key: 'lastName',
        label: 'Last Name',
      },
      {
        key: 'department',
        label: 'Department',
      },
      {
        key: 'teamOrSection',
        label: 'Team Section',
      },
      {
        key: 'sector',
        label: 'Sector',
      },
      {
        key: 'costCenter',
        label: 'Cost Center',
      },
      {
        key: 'englishJobTitle',
        label: 'English Job Title',
      },
      {
        key: 'vietnameseJobTitle',
        label: 'Vietnamese Job Title',
      },
      {
        key: 'workingPlace',
        label: 'Working Place',
      },
      {
        key: 'accountCustomer',
        label: 'Account Customer',
      },
      {
        key: 'rcs',
        label: ' RCS',
      },
      {
        key: 'staffCategory',
        label: 'Staff Category',
      },
      {
        key: 'seniorityDate',
        label: 'Seniority Date',
      },
      {
        key: 'bvTime',
        label: ' BV Time',
      },
      {
        key: 'startWorkingDay',
        label: 'Start Working Day',
      },
      {
        key: 'lastWorkingDay',
        label: 'Last Working Day',
      },
      {
        key: 'hcmRole',
        label: 'Hcm Role',
      },
      {
        key: 'avatar',
        label: 'Avatar',
      },
      {
        key: 'attachmentGeneralInformation',
        label: 'Attachment',
      },
    ],
  },
  {
    key: 'management',
    label: 'Management',
    items: [
      {
        key: 'subLeader',
        label: 'Sub Leader',
      },
      {
        key: 'directManager',
        label: 'Direct Manager',
      },
      {
        key: 'upperManager',
        label: 'Upper Manager',
      },
      {
        key: 'hod',
        label: 'HOD',
      },
      {
        key: 'hrbp',
        label: 'HRBP',
      },
      {
        key: 'pjc',
        label: 'PJC',
      },
      {
        key: 'attachmentManagement',
        label: 'Attachment',
      },
    ],
  },
  {
    key: 'pit',
    label: 'PIT',
    items: [
      {
        key: 'taxCode',
        label: 'Tax Code',
      },
      {
        key: 'noOfDependant',
        label: 'No. Of Dependant',
      },
      {
        key: 'attachmentPIT',
        label: 'Attachment',
      },
    ],
  },
  {
    key: 'shui',
    label: 'SHUI',
    items: [
      {
        key: 'siNumber',
        label: 'Si Number',
      },
      {
        key: 'hospitalCodeForHICard',
        label: 'Hospital Code',
      },
      {
        key: 'hospitalNameForHICard',
        label: 'Hospital Name',
      },
      {
        key: 'attachmentSHUI',
        label: 'Attachment',
      },
    ],
  },
  {
    key: 'laborContract',
    label: 'Labor Contract',
    items: [
      {
        key: 'probationOrInternAgreementNo',
        label: 'Probation Agreement No',
      },
      {
        key: 'probationStartDate',
        label: 'Probation Start Date',
      },
      {
        key: 'probationEndDate',
        label: 'Probation End Date',
      },
      {
        key: 'laborContractNo',
        label: 'Labor Contract No',
      },
      {
        key: 'firstLaborContractStartDate',
        label: 'First Labor Contract Start Date',
      },
      {
        key: 'firstLaborContractEndDate',
        label: 'First Labor Contract End Date',
      },
      {
        key: 'indefiniteTermLaborContractNo',
        label: 'Indefinite Term Labor Contract No',
      },
      {
        key: 'indefiniteTermLaborContractStartDate',
        label: 'Indefinite Term Labor Contract Start Date',
      },
      {
        key: 'currentTypeOfContract',
        label: 'Current Type Of Contract',
      },
      {
        key: 'attachmentLaborContract',
        label: 'Attachment',
      },
    ],
  },
  {
    key: 'personalInfo',
    label: 'Personal Information',
    items: [
      {
        key: 'privatePhoneNumber',
        label: 'Private Phone Number',
      },
      {
        key: 'dateOfBirth',
        label: ' DOB',
      },
      {
        key: 'originalHome',
        label: 'Original Home',
      },
      {
        key: 'marriageStatus',
        label: 'Marital Status',
      },
      {
        key: 'gender',
        label: 'Gender',
      },
      {
        key: 'ethnics',
        label: 'Ethnics',
      },
      {
        key: 'religion',
        label: 'Religion',
      },
      {
        key: 'nationality',
        label: 'Nationality',
      },
      {
        key: 'idCardNumberOld',
        label: 'Id Card Number Old',
      },
      {
        key: 'idCardNumberCurrent',
        label: 'Id Card Number Current',
      },
      {
        key: 'dateOfIssuance',
        label: 'Date Of Issue',
      },
      {
        key: 'dateOfExpiration',
        label: 'Date Of Expiration',
      },
      {
        key: 'placeOfIssuance',
        label: 'Place Of Issuance',
      },
      {
        key: 'emergencyContact',
        label: 'Emergency Contact',
      },
      {
        key: 'emergencyContactorName',
        label: 'Emergency Contact Name',
      },
      {
        key: 'permanentResidenceAddressHouseNumberOrStreet',
        label: 'Permanent Residence Address House Number',
      },
      {
        key: 'permanentResidenceAddressWardOrCommune',
        label: 'Permanent Residence Address Ward',
      },
      {
        key: 'permanentResidenceAddressDistrict',
        label: 'Permanent Residence Address District',
      },
      {
        key: 'permanentResidenceAddressProvinceOrCity',
        label: 'Permanent Residence Address Province',
      },
      {
        key: 'permanentAddress',
        label: 'Permanent Address',
      },
      {
        key: 'temporaryAddress',
        label: 'Temporary Address',
      },
      {
        key: 'educationLevel',
        label: 'Education Level',
      },
      {
        key: 'qualificationLevel',
        label: 'Qualification Level',
      },
      {
        key: 'major',
        label: 'Major',
      },
      {
        key: 'universityOrCollegeName',
        label: 'University',
      },
      {
        key: 'graduationYear',
        label: 'Graduation Year',
      },
      {
        key: 'foreignLanguage',
        label: 'Foreign Language',
      },
      {
        key: 'privateEmailAddress',
        label: 'Private Email',
      },
      {
        key: 'companyEmail',
        label: 'Company Email',
      },
      {
        key: 'userId',
        label: 'User Id',
      },
      {
        key: 'attachmentPersonalInformation',
        label: 'Attachment',
      },
    ],
  },
  {
    key: 'informationFamilyBook',
    label: 'Information Family Book',
    items: [
      {
        key: 'familyBookNumber',
        label: 'Family Book Number',
      },
      {
        key: 'familyBookOwnerName',
        label: 'Family Book Owner Name',
      },
      {
        key: 'familyBookOwnerBirthday',
        label: 'Family Book Owner Birthday',
      },
      {
        key: 'familyBookOwnerId',
        label: 'Family Book Owner Id',
      },
      {
        key: 'ownerGender',
        label: 'Owner Gender',
      },
      {
        key: 'relationshipBetweenOwnerAndEmployee',
        label: 'Relationship Between Owner And Employee',
      },
      {
        key: 'attachmentInformationFamilyBook',
        label: 'Attachment',
      },
    ],
  },
  {
    key: 'bankAccountInfor',
    label: 'Bank Account Information',
    items: [
      {
        key: 'bankAccountNumber',
        label: 'Bank Account Number',
      },
      {
        key: 'bankName',
        label: 'Bank Name',
      },
      {
        key: 'branchOfBank',
        label: 'Branch Of Bank',
      },
      {
        key: 'bankCode',
        label: 'Bank Code',
      },
      {
        key: 'attachment',
        label: 'Attachment',
      },
    ],
  },
  {
    key: 'resignationLeaveInfor',
    label: 'Resignation Leave Information',
    items: [
      {
        key: 'resignationReasons',
        label: 'Resignation Reasons',
      },
      {
        key: 'noOfTerminationDecision',
        label: 'No Of Termination Decision',
      },
      {
        key: 'startDateOfUnpaidLeaveOrMaternity',
        label: 'Start Date Of Unpaid Leave Or Maternity',
      },
      {
        key: 'backDatedAfterUnpaidLeaveOrMaternity',
        label: 'Back Dated After Unpaid Leave',
      },
      {
        key: 'typeOfUnpaidLeave',
        label: 'Type Of Unpaid Leave',
      },
      {
        key: 'remarkOfUnpaidLeave',
        label: 'Remark Of Unpaid Leave',
      },
      {
        key: 'attachmentResignationLeaveInformation',
        label: 'Attachment',
      },
    ],
  },
  {
    key: 'healthCare',
    label: 'Health Care',
    items: [
      {
        key: 'healthCareNumber',
        label: 'Health Care Number',
      },
      {
        key: 'startDate',
        label: 'Start Date',
      },
      {
        key: 'healthCareLevel',
        label: 'Health Care Level',
      },
      {
        key: 'noOfDependantPaidByEmployer',
        label: 'No Of Dependant Employer',
      },
      {
        key: 'noOfDependantPaidByEmployee',
        label: 'No Of Dependant Employee',
      },
      {
        key: 'attachmentHealthCare',
        label: 'Attachment',
      },
    ],
  },
];

interface ISchemaCustom extends ISchema {
  key: string;
}

const form = createForm();
const formGroup = createForm();
const CheckboxForm = () => {
  const [schemaFields, setSchemaFields] = useState<ISchemaCustom[]>([]);
  const [schemaGroups, setSchemaGroups] = useState<ISchemaCustom[]>([]);
  const { mutate, isLoading } = useMutation(exportExcel);

  const handleCheckboxItem = (
    key: string,
    keyFields: string[],
    keyGroups: string[]
  ) => {
    formGroup.addEffects(key, () => {
      onFieldInputValueChange(key, (field) => {
        form.setValuesIn(
          `[${keyFields}]`,
          keyFields.map((_) => field.value)
        );
      });
      onFieldValueChange(key, () => {
        const valuesGroup = formGroup.getValuesIn(`[${keyGroups}]`);
        const countCheckedGroup = (valuesGroup as boolean[]).filter(
          (value) => value
        ).length;
        formGroup.setValuesIn(
          'selectAll',
          countCheckedGroup === keyGroups.length
        );
      });
      onFieldInputValueChange('selectAll', (field) => {
        formGroup.setValuesIn(
          `[${keyGroups}]`,
          keyGroups.map((_) => field.value)
        );
        form.setValuesIn(
          `[${keyFields}]`,
          keyFields.map((_) => field.value)
        );
      });
    });
    form.addEffects(key, () => {
      onFieldInputValueChange(`*(${keyFields.toString()})`, () => {
        const values = form.getValuesIn(`[${keyFields}]`);
        const countChecked = (values as boolean[]).filter(
          (value) => value
        ).length;
        formGroup.setValuesIn(key, countChecked === keyFields.length);
      });
    });
  };
  useEffect(() => {
    const keyGroup = fields.map((field) => field.key);
    fields.forEach((field) => {
      const keys = field.items
        .filter((item) => !item.value)
        .map((item) => item.key);
      const items = field.items.map((item) => {
        form.setValuesIn(item.key, !!item.value);
        return {
          [item.key]: {
            'x-component': 'Checkbox',
            'x-component-props': {
              label: item.label,
              labelProps: {
                className: 'inline-block',
              },
              disabled: item.value,
            },
          },
        };
      });
      const schemaGroupField = {
        key: field.key,
        properties: {
          [field.key]: {
            'x-component': 'Checkbox',
            'x-component-props': {
              label: field.label,
              labelProps: {
                className: 'inline-block font-semibold',
              },
            },
          },
        },
      };
      const schemaField = {
        key: field.key,
        properties: {
          collapse: {
            type: 'void',
            'x-decorator': 'Collapse',
            'x-decorator-props': {
              defaultChecked: true,
              classNameButton: 'absolute top-2 right-2',
            },
            properties: {
              grid: {
                type: 'void',
                'x-decorator': 'SimpleGrid',
                'x-decorator-props': {
                  cols: 5,
                  className: 'mt-2',
                },
                properties: Object.assign({}, ...items),
              },
            },
          },
        },
      };
      setSchemaGroups((prev) => {
        const existSchema = prev.find((p) => p.key === schemaGroupField.key);
        if (existSchema) {
          return prev;
        }
        return [...prev, schemaGroupField];
      });
      setSchemaFields((prev) => {
        const existSchema = prev.find((p) => p.key === schemaField.key);
        if (existSchema) {
          return prev;
        }
        return [...prev, schemaField];
      });
      handleCheckboxItem(field.key, keys, keyGroup);
    });
  }, []);

  const onSubmit = (data: Record<string, unknown>) => {
    const payload = {
      ...data,
      searchValue: '',
      searchFilter: false,
      myTeamFilter: true,
      roleValue: null,
      roleFilter: false,
      statusValue: null,
      statusFilter: false,
    };
    mutate(payload, {
      onSuccess: (response) => {
        FileSaver.saveAs(response, 'MASTER_EMPLOYEE_DATA.xlsx');
      },
    });
  };
  return (
    <FormProvider form={form}>
      <FormProvider form={formGroup}>
        <Field
          name="selectAll"
          component={[
            Checkbox,
            {
              label: 'Select All',
            },
          ]}
        />
      </FormProvider>
      {schemaGroups.map((schema, index) => (
        <FormProvider form={formGroup}>
          <Container className="mt-4 p-4 border-solid border border-zinc-200 rounded  relative max-w-full">
            <SchemaField schema={schema} />
            <FormProvider form={form}>
              <SchemaField schema={schemaFields[index]} />
            </FormProvider>
          </Container>
        </FormProvider>
      ))}
      <div className="flex mt-8 justify-center">
        <Button
          loading={isLoading}
          className="block mx-auto"
          type="submit"
          leftIcon={<IconFileExport size={18} />}
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            e.preventDefault();
            form.submit(onSubmit).catch(() => false);
          }}
        >
          Export
        </Button>
      </div>
    </FormProvider>
  );
};

export default CheckboxForm;
