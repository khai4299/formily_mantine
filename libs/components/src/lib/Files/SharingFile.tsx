import React, { FC, useEffect, useState } from 'react';
import { FileInput, Group, Loader, Text } from '@mantine/core';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import {
  IconCircleCheck,
  IconCloudUpload,
  IconInfoCircle,
} from '@tabler/icons';
import { StyledUpload } from './styles';
import { useMutation } from 'react-query';
import {
  BaseFormItemProps,
  convertAttachmentName,
  convertFile,
  FileUpload,
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';
import { FileRejection } from 'react-dropzone';
import { useField } from '@formily/react';
import { Field, registerValidateRules } from '@formily/core';

interface Props {
  label: string;
  required?: boolean;
  value: FileUpload;
  serverRequest: (file: File) => Promise<string>;
  onChange: (file: FileUpload) => void;
}

const SharingFile: FC<DropzoneProps & BaseFormItemProps & Props> = (props) => {
  const [file, setFile] = useState<FileUpload | null>();
  const error = useFieldValidate();
  const field = useField<Field>();
  const {
    mutate: upload,
    isLoading,
    error: errorUpload,
  } = useMutation(props.serverRequest);

  useEffect(() => {
    if (props.required) {
      field.setValidatorRule('requiredFile', (value: FileUpload) => value);
    }
  }, []);
  useEffect(() => {
    setFile(props.value);
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
      <div>
        {!file?.file && (
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
        {file?.file && (
          <FileInput
            value={file?.file}
            icon={
              isLoading ? (
                <Loader size="sm" />
              ) : file.error ? (
                <IconInfoCircle className="text-red-600" />
              ) : (
                <IconCircleCheck className="text-green-600" />
              )
            }
            accept={props.accept?.toString()}
            error={
              file.error && (errorUpload ? 'Update fail' : 'Wrong file type')
            }
            clearable={true}
            onChange={onChange}
          />
        )}
      </div>
      {error && (
        <div className="text-xs text-red-500">
          {takeMessageForm(field, props.feedbackText)}
        </div>
      )}
    </StyledUpload>
  );
};
export default SharingFile;
