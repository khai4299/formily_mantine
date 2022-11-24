import React, { FC, useState } from 'react';
import { FileInput, Group, Loader, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone';
import { FaCloudUploadAlt, FaRegCheckCircle } from 'react-icons/fa';
import { BiErrorCircle } from 'react-icons/bi';
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

interface Props {
  label: string;
  required?: boolean;
  value: string;
  serverRequest: (file: File) => Promise<any>;
  onChange: (subPath: Record<string, string> | null) => void;
}

const SharingFile: FC<DropzoneProps & BaseFormItemProps & Props> = (props) => {
  const [fileReject, setFileReject] = useState<FileWithPath | null>(null);
  const [fileDrop, setFileDrop] = useState<FileWithPath | null>(null);
  const error = useFieldValidate();
  const field = useField<Field>();
  const { mutate: upload, isLoading } = useMutation(props.serverRequest, {
    onSuccess: (response) => {
      props.onChange({ url: response });
    },
    onError: () => {
      props.onChange(null);
      setFileReject(null);
      setFileDrop(null);
    },
  });
  const onDrop = (fileDrops: FileWithPath[]) => {
    const file = fileDrops[0];
    setFileDrop(file);
    setFileReject(null);
    upload(file);
  };
  const onReject = (fileRejects: FileRejection[]) => {
    const file = fileRejects[0];
    setFileReject(file.file);
    setFileDrop(null);
    props.onChange(null);
  };
  const onChange = (file: File) => {
    if (!file) {
      setFileReject(null);
      setFileDrop(null);
      props.onChange(null);
    } else {
      setFileDrop(file);
      setFileReject(null);
      upload(file);
    }
  };
  return (
    <StyledUpload>
      <label className="inline-block text-sm font-medium break-all cursor-default">
        {props.label}
        {props.required && <span className="text-red-500"> *</span>}
      </label>
      <div>
        {!fileDrop && !fileReject && (
          <Dropzone
            loading={isLoading}
            className="border border-dashed border-blue-600 mb-5px p-0 "
            accept={props.accept}
            onDrop={onDrop}
            onReject={onReject}
          >
            <Group position="center" spacing="xl">
              <Dropzone.Idle>
                <FaCloudUploadAlt className="text-blue-600" size={40} />
              </Dropzone.Idle>
              <label className="inline-flex">
                <Text className="text-blue-600"> Choose a file&nbsp;</Text>
                or drop it here
              </label>
            </Group>
          </Dropzone>
        )}
        {(fileDrop || fileReject) && (
          <FileInput
            value={fileDrop ? fileDrop : fileReject}
            icon={
              isLoading ? (
                <Loader size="sm" />
              ) : fileDrop ? (
                <FaRegCheckCircle className="text-green-600" />
              ) : (
                <BiErrorCircle className="text-red-600" />
              )
            }
            error={fileReject && 'Wrong file type'}
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
