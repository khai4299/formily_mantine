import React, { FC, useEffect, useState } from 'react';
import { FileInput, Group, Loader, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone';
import { IconCheck, IconCloudUpload, IconInfoCircle } from '@tabler/icons';
import { StyledUpload } from './styles';
import { useMutation, useQuery } from 'react-query';
import { FileRejection } from 'react-dropzone';
import {
  BaseFormItemProps,
  convertAttachmentName,
  getFile,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';
import { useField } from '@formily/react';
import { Field } from '@formily/core';

interface Props {
  label: string;
  required?: boolean;
  onChange: (file: string | null) => void;
  value: string;
  error?: boolean;
  serverRequest: (file: File) => Promise<any>;
}

const UploadFile: FC<DropzoneProps & BaseFormItemProps & Props> = (props) => {
  const field = useField<Field>();
  const {
    mutate: upload,
    isLoading,
    error: errorUpload,
  } = useMutation(props.serverRequest);
  const { mutate: getUpload } = useMutation(getFile);
  const error = useFieldValidate();
  useEffect(() => {
    if (props.value && !field.data) {
      getUpload(props.value, {
        onSuccess: (response) => {
          field.setData({
            file: new File([response], convertAttachmentName(props.value)),
            error: false,
          });
        },
      });
    }
  }, [props.value]);
  const onUpdateSuccess = (file: File, response: string) => {
    field.setData({ file: file, error: false });
    props.onChange(response);
  };
  const onUpdateFail = (file: File) => {
    field.setData({ file: file, error: true });
    props.onChange(null);
  };
  const onDrop = (fileDrops: FileWithPath[]) => {
    upload(fileDrops[0], {
      onSuccess: (response) => {
        onUpdateSuccess(fileDrops[0], response);
      },
      onError: () => {
        onUpdateFail(fileDrops[0]);
      },
    });
  };
  const onReject = (fileRejects: FileRejection[]) => {
    onUpdateFail(fileRejects[0].file);
  };
  const onChange = (file: File) => {
    if (!file) {
      props.onChange(null);
      field.setData(null);
    } else {
      if (props.accept && !(props.accept as string[]).includes(file.type)) {
        onUpdateFail(file);
      } else {
        upload(file, {
          onSuccess: (response) => {
            onUpdateSuccess(file, response);
          },
          onError: () => {
            onUpdateFail(file);
          },
        });
      }
    }
  };
  return (
    <StyledUpload className={props.className}>
      <label className="inline-block text-sm font-medium break-all cursor-default">
        {props.label}
        {props.required && <span className="text-red-500"> *</span>}
      </label>
      {!field.data && (
        <Dropzone
          loading={isLoading}
          className="border border-dashed border-blue-600 mb-5px p-2"
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
              or drop&nbsp;it&nbsp;here
            </label>
          </Group>
        </Dropzone>
      )}
      {field.data && (
        <FileInput
          value={field.data.file}
          accept={props.accept?.toString()}
          icon={
            isLoading ? (
              <Loader size="sm" />
            ) : field.data.error ? (
              <IconInfoCircle className="text-red-600" />
            ) : (
              <IconCheck className="text-green-600" />
            )
          }
          error={
            field.data.error &&
            (errorUpload ? 'Update fail' : 'Wrong file type')
          }
          clearable={true}
          onChange={onChange}
        />
      )}
      {error && (
        <div className="text-xs text-red-500">
          {takeMessageForm(field, props.feedbackText)}
        </div>
      )}
      {props.value && field.data && (
        <div>
          <img
            className="object-contain w-full h-36 mx-auto mt-4"
            src={URL.createObjectURL(field.data.file)}
            alt=""
          />
        </div>
      )}
    </StyledUpload>
  );
};

export default UploadFile;
