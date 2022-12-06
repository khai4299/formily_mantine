import React, { FC, useEffect, useState } from 'react';
import { FileInput, Group, Loader, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone';
import {
  IconInfoCircle,
  IconCloudUpload,
  IconCircleCheck,
} from '@tabler/icons';
import { StyledUpload } from './styles';
import { useMutation } from 'react-query';
import {
  BaseFormItemProps,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';
import { FileRejection } from 'react-dropzone';
import { useField } from '@formily/react';
import { Field } from '@formily/core';
import { isEmpty } from 'lodash';

interface FilePath {
  path?: string | null;
  file?: string | null;
}

interface Props {
  label: string;
  required?: boolean;
  value: Record<string, string>;
  serverRequest: (file: File) => Promise<string>;
  onChange: ({ path, file }: FilePath) => void;
}

const SharingFile: FC<DropzoneProps & BaseFormItemProps & Props> = (props) => {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [isReject, setIsReject] = useState<boolean>(false);
  const error = useFieldValidate();
  const field = useField<Field>();

  const {
    mutate: upload,
    isLoading,
    error: errorUpload,
  } = useMutation(props.serverRequest, {
    onSuccess: (response) => {
      props.onChange({ ...field.value, path: response });
    },
    onError: () => {
      setIsReject(true);
    },
  });
  const onUpdateSuccess = (file: File) => {
    setIsReject(false);
    props.onChange({ file: file.name });
    upload(file);
  };
  const onUpdateReject = (file: File) => {
    setIsReject(true);
    props.onChange({ file: file.name });
  };
  const onClear = () => {
    setIsReject(false);
    props.onChange({ path: null });
  };
  const onDrop = (fileDrops: File[]) => {
    onUpdateSuccess(fileDrops[0]);
  };
  const onReject = (fileRejects: FileRejection[]) => {
    const file = fileRejects[0];
    onUpdateReject(file.file);
  };
  const onChange = (file: File) => {
    if (!file) {
      onClear();
    } else {
      if (!props.accept || (props.accept as string[]).includes(file.type)) {
        onUpdateSuccess(file);
      } else {
        onUpdateReject(file);
      }
    }
  };
  useEffect(() => {
    if (field.value) {
      setFilePath(field.value.file);
    }
  }, [field.value]);
  return (
    <StyledUpload className={props.className}>
      <label className="inline-block text-sm font-medium break-all cursor-default">
        {props.label}
        {props.required && <span className="text-red-500"> *</span>}
      </label>
      <div>
        {!filePath && (
          <Dropzone
            loading={isLoading}
            className="border border-dashed border-blue-600 mb-5px p-0 "
            accept={props.accept}
            onDrop={onDrop}
            onReject={onReject}
          >
            <Group position="center" spacing="xl">
              <Dropzone.Idle>
                <IconCloudUpload className="text-blue-600" size={40} />
              </Dropzone.Idle>
              <label className="inline-flex">
                <Text className="text-blue-600"> Choose a file&nbsp;</Text>
                or drop it here
              </label>
            </Group>
          </Dropzone>
        )}
        {filePath && (
          <FileInput
            value={{ name: filePath } as File}
            icon={
              isLoading ? (
                <Loader size="sm" />
              ) : isReject ? (
                <IconInfoCircle className="text-red-600" />
              ) : (
                <IconCircleCheck className="text-green-600" />
              )
            }
            accept={props.accept?.toString()}
            error={
              isReject && (errorUpload ? 'Update fail' : 'Wrong file type')
            }
            clearable={true}
            onChange={onChange}
          />
        )}
      </div>
      {error && (
        <div className="text-xs text-red-500">
          {takeMessageForm(field, takeMessageForm(field, props.feedbackText))}
        </div>
      )}
    </StyledUpload>
  );
};

export default SharingFile;
