import React, { FC, useState } from 'react';
import { FileInput, Group, Loader, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone';
import { FaCloudUploadAlt, FaRegCheckCircle } from 'react-icons/fa';
import { BiErrorCircle } from 'react-icons/bi';
import { StyledUpload } from './styles';
import { useMutation } from 'react-query';
import { uploadFile } from '@formily-mantine/cdk';
import { FileRejection } from 'react-dropzone';

interface Props {
  label: string;
  required?: boolean;
  onChange: (value: string | null) => void;
  value: string;
  error?: boolean;
}

const SharingFile: FC<DropzoneProps & Props> = (props) => {
  const [fileReject, setFileReject] = useState<FileWithPath | null>(null);
  const [fileDrop, setFileDrop] = useState<FileWithPath | null>(null);
  const { mutate: upload, isLoading } = useMutation(uploadFile, {
    onSuccess: (response) => {
      props.onChange(response);
    },
  });
  console.log(props);
  const onDrop = (fileDrops: FileWithPath[]) => {
    const file = fileDrops[0];
    setFileDrop(file);
    setFileReject(null);
    upload({ subPath: 'employee', file: file });
  };
  const onReject = (fileRejects: FileRejection[]) => {
    const file = fileRejects[0];
    setFileReject(file.file);
    setFileDrop(null);
    props.onChange(null);
  };
  const onRemove = (fileRemove: File) => {
    if (!fileRemove) {
      setFileReject(null);
      setFileDrop(null);
      props.onChange(null);
    }
  };
  return (
    <StyledUpload>
      <label className="inline-block text-sm font-medium break-all cursor-default">
        {props.label}
        {props.required && <span className="text-red-500"> *</span>}
      </label>

      {!fileReject && !fileDrop && (
        <Dropzone
          className="border border-dashed border-blue-600 mb-5px p-2"
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
              or drop&nbsp;it&nbsp;here
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
          onChange={onRemove}
        />
      )}
      {props.error && (
        <div className="text-xs text-red-500">The field is not blank</div>
      )}
    </StyledUpload>
  );
};

export default SharingFile;
