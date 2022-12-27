import React, { MouseEvent, useEffect, useState } from 'react';
import {
  Checkbox,
  Collapse,
  Container,
  SchemaField,
} from '@formily-mantine/components';
import {
  createForm,
  onFieldInputValueChange,
  onFieldValueChange,
} from '@formily/core';
import {
  createSchemaField,
  Field,
  FormProvider,
  ISchema,
} from '@formily/react';
import { Button, Col, Grid, SimpleGrid } from '@mantine/core';

type fieldsType = {
  key: string;
  label: string;
  items: { key: string; label: string; value?: boolean }[];
};
const fields: fieldsType[] = [
  {
    key: 'general',
    label: 'General Information',
    items: [
      {
        key: 'status',
        label: 'status',
      },
      {
        key: 'vcode',
        label: 'vcode',
        value: true,
      },
      {
        key: 'cifNumber',
        label: 'cifNumber',
        value: true,
      },
      {
        key: 'englishName',
        label: 'englishName',
        value: true,
      },
    ],
  },
  {
    key: 'managment',
    label: 'Management',
    items: [
      {
        key: 'subLeader',
        label: 'subLeader',
      },
      {
        key: 'directManager',
        label: 'directManager',
      },
      {
        key: 'upperManager',
        label: 'upperManager',
      },
      {
        key: 'hod',
        label: 'hod',
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
        return {
          [item.label]: {
            'x-component': 'Checkbox',
            'x-component-props': {
              label: item.label,
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
    console.log(data);
  };
  useEffect(() => {
    form.setInitialValues({
      vcode: true,
      cifNumber: true,
      englishName: true,
    });
  }, []);
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
          <Container className="relative max-w-full">
            <SchemaField schema={schema} />
            <FormProvider form={form}>
              <SchemaField schema={schemaFields[index]} />
            </FormProvider>
          </Container>
        </FormProvider>
      ))}
      <div className="flex mt-8 justify-center">
        <Button
          className="block mx-auto"
          type="submit"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            e.preventDefault();
            form.submit(onSubmit).catch(() => false);
          }}
        >
          Save
        </Button>
      </div>
    </FormProvider>
  );
};

export default CheckboxForm;
