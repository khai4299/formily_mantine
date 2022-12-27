import { Checkbox } from '../Checkbox';
import { MultiSelect, Select } from '../Select';
import { ComboBox } from '../ComboBox';
import {
  ColorInput,
  Input,
  NumberInput,
  PasswordInput,
  Textarea,
  TimeInput,
} from '../Input';
import { SharingFile, UploadFile } from '../Files';
import { RepeatItem } from '../RepeatItem';
import { Switch } from '../Switch';
import { DatePicker, DateRangePicker } from '../DatePicker';
import { Col, Grid, SimpleGrid } from '@mantine/core';
import ValidatorText from './ValidatorText';
import { Collapse } from '../Collapse';
import { Container } from '../Container';
import { createSchemaField } from '@formily/react';

export const SchemaField = createSchemaField({
  components: {
    Select,
    ComboBox,
    Input,
    NumberInput,
    TimeInput,
    PasswordInput,
    ColorInput,
    Textarea,
    UploadFile,
    SharingFile,
    RepeatItem,
    MultiSelect,
    DatePicker,
    DateRangePicker,
    Checkbox,
    Switch,
    ValidatorText,
    Grid,
    SimpleGrid,
    Col,
    Collapse,
    Container,
  },
});
