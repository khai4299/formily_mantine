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
  takeMessageForm,
  useFieldValidate,
} from '@formily-mantine/cdk';
import { FileRejection } from 'react-dropzone';
import { useField } from '@formily/react';
import { Field, registerValidateRules } from '@formily/core';
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
  onChange: (file: FilePath | null) => void;
}

registerValidateRules({
  requiredPath(value) {
    if (!value) return '';
    return !value.path ? 'The field value is required' : '';
  },
});
const SharingFile: FC<DropzoneProps & BaseFormItemProps & Props> = (props) => {
  const [loadingFile, setLoadingFile] = useState<File | null>(null);
  const [rejectFile, setRejectFile] = useState<File | null>(null);
  const error = useFieldValidate();
  const field = useField<Field>();
  const {
    mutate: upload,
    isLoading,
    error: errorUpload,
  } = useMutation(props.serverRequest);
  useEffect(() => {
    if (field.required) {
      field.setValidatorRule('requiredPath', (value: FilePath) => value);
    }
  }, []);
  const onUpdateSuccess = (file: File, response: string) => {
    props.onChange({ path: response, file: file.name });
  };
  const onUpdateFail = (file: File) => {
    props.onChange({ path: null, file: file.name });
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
  useEffect(() => {
    if (isEmpty(field.value)) {
      setLoadingFile(null);
      setRejectFile(null);
    } else {
      setLoadingFile(
        field.value.path ? ({ name: field.value.file } as File) : null
      );
      setRejectFile(
        !field.value.path ? ({ name: field.value.file } as File) : null
      );
    }
  }, [field.value]);
  const onReject = (fileRejects: FileRejection[]) => {
    onUpdateFail(fileRejects[0].file);
  };
  const onChange = (file: File) => {
    if (!file) {
      props.onChange(null);
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
        {!loadingFile && !rejectFile && (
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
        {(loadingFile || rejectFile) && (
          <FileInput
            value={loadingFile || rejectFile}
            icon={
              isLoading ? (
                <Loader size="sm" />
              ) : loadingFile ? (
                <IconCircleCheck className="text-green-600" />
              ) : (
                <IconInfoCircle className="text-red-600" />
              )
            }
            accept={props.accept?.toString()}
            error={
              rejectFile && (errorUpload ? 'Update fail' : 'Wrong file type')
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
