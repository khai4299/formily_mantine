export const convertAttachmentName = (name: string) => {
  return name.split('/')[name.split('/').length - 1];
};
