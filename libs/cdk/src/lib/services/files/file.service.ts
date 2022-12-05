import axios from 'axios';

const BASE_URL = process.env['NX_API_FILE_URL'];
const token = localStorage.getItem('access_token');

export const uploadFile = async (
  subPath: string,
  file: File,
  keepSize?: boolean,
  keepName?: boolean
) => {
  const formData = new FormData();

  formData.append('subPath', subPath);
  formData.append('file', file, keepName ? file.name : undefined);
  formData.append('keepSize', '' + !!keepSize);
  formData.append('keepName', '' + !!keepName);

  const res = await axios.post('store/file/upload', formData, {
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'text',
  });
  return res.data;
};
