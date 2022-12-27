import { FileUpload } from '../types';

export const convertAttachmentName = (name: string) => {
  return name.split('/')[name.split('/').length - 1];
};

export const convertFile = (file: string): FileUpload => {
  return {
    file: {
      name: convertAttachmentName(file),
    } as File,
    path: file,
  };
};
