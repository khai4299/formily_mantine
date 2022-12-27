import React, { FC, useEffect, useState } from 'react';
import { FileInput, Group, Loader, Text } from '@mantine/core';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { IconCheck, IconCloudUpload, IconInfoCircle } from '@tabler/icons';
import { StyledUpload } from './styles';
import { useMutation } from 'react-query';
import { FileRejection } from 'react-dropzone';
import {
  BaseFormItemProps,
  convertAttachmentName,
  FileUpload,
  getFile,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';
import { useField } from '@formily/react';
import { Field } from '@formily/core';

interface Props {
  label: string;
  required?: boolean;
  onChange: (file: FileUpload) => void;
  value: FileUpload;
  error?: boolean;
  serverRequest: (file: File) => Promise<string>;
}

const UploadFile: FC<DropzoneProps & BaseFormItemProps & Props> = (props) => {
  const field = useField<Field>();

  const {
    mutate: upload,
    isLoading,
    error: errorUpload,
  } = useMutation(props.serverRequest);
  const [file, setFile] = useState<FileUpload | null>();

  const { mutate: getUpload } = useMutation(getFile);
  const error = useFieldValidate();
  useEffect(() => {
    if (props.required) {
      field.setValidatorRule('requiredFile', (value: FileUpload) => value);
    }
  }, []);
  useEffect(() => {
    if (props.value) {
      if (!props.value.file && props.value.path) {
        getUpload(props.value.path, {
          onSuccess: (response) => {
            setFile({
              file: new File(
                [response],
                convertAttachmentName(props.value.path || '')
              ),
              error: false,
              path: props.value.path,
            });
          },
        });
      } else {
        setFile(props.value);
      }
    }
  }, [props.value]);
  const onUpdateSuccess = (file: File, response: string) => {
    props.onChange({ file: file, path: response, error: false });
  };
  const onUpdateFail = (file: File) => {
    props.onChange({ file: file, error: true, path: null });
  };
  const onDrop = (fileDrops: File[]) => {
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
      props.onChange({ file: null, error: false, path: null });
      setFile(null);
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
      {!file?.file && (
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
      {file?.file && (
        <FileInput
          value={file?.file}
          accept={props.accept?.toString()}
          icon={
            isLoading ? (
              <Loader size="sm" />
            ) : file?.error ? (
              <IconInfoCircle className="text-red-600" />
            ) : (
              <IconCheck className="text-green-600" />
            )
          }
          error={
            file?.error && (errorUpload ? 'Update fail' : 'Wrong file type')
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
      {file?.file && (
        <img
          className="object-contain w-full h-36 mx-auto mt-4"
          src={URL.createObjectURL(file?.file)}
          alt=""
        />
      )}
    </StyledUpload>
  );
};

export default UploadFile;
