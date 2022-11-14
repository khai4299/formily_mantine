import React, { FC, useState } from 'react';
import { FileInput, Group, Text } from '@mantine/core';
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from '@mantine/dropzone';
import { FaCloudUploadAlt, FaRegCheckCircle } from 'react-icons/fa';
import { BiErrorCircle } from 'react-icons/bi';
import { StyledUpload } from './styles';

interface Props {
  label: string;
  required?: boolean;
  onChange: any;
  value: any;
  error?: boolean;
}

const SharingFile: FC<DropzoneProps & Props> = (props) => {
  const [fileReject, setFileReject] = useState<FileWithPath | null>(null);
  return (
    <StyledUpload>
      <label className="inline-block text-sm font-medium break-all cursor-default">
        {props.label}
        {props.required && <span className="text-red-500"> *</span>}
      </label>
      {!fileReject && !props.value && (
        <Dropzone
          className="border border-dashed border-blue-600 mb-5px p-2"
          accept={props.accept}
          onDrop={(fileDrops) => {
            const file = fileDrops[0];
            setFileReject(null);
            props.onChange(file);
          }}
          onReject={(fileRejects) => {
            const file = fileRejects[0];
            setFileReject(file.file);
            props.onChange(null);
          }}
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
      {(props.value || fileReject) && (
        <FileInput
          value={props.value ? props.value : fileReject}
          icon={
            props.value ? (
              <FaRegCheckCircle className="text-green-600" />
            ) : (
              <BiErrorCircle className="text-red-600" />
            )
          }
          error={fileReject && 'Wrong file type'}
          clearable={true}
          onChange={(fileInput) => {
            if (!fileInput) {
              setFileReject(null);
              props.onChange(null);
            }
          }}
        />
      )}
      {props.error && (
        <div className="text-xs text-red-500">The field is not blank</div>
      )}
      {props.value && (
        <div>
          <img
            className="object-contain w-full h-36 mx-auto mt-4"
            src={URL.createObjectURL(props.value)}
            alt=""
          />
        </div>
      )}
    </StyledUpload>
  );
};

export default SharingFile;
