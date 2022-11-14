import axios from 'axios';

const BASE_URL = process.env['NX_API_FILE_URL'];

export const uploadFile = async (payload: {
  subPath: string;
  file: File;
  keepSize?: boolean;
  keepName?: boolean;
}) => {
  const formData = new FormData();

  formData.append('subPath', payload.subPath);
  formData.append(
    'file',
    payload.file,
    payload.keepName ? payload.file.name : undefined
  );
  formData.append('keepSize', '' + !!payload.keepSize);
  formData.append('keepName', '' + !!payload.keepName);

  const res = await axios.post('store/file/upload', formData, {
    baseURL: BASE_URL,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJqeTlxNWxUMjU1VVktc3o1M3JIRFFIOUF5dlB2cGV6Z25XQXJfNGNCVHhVIn0.eyJleHAiOjE2Njg1MDMzMDMsImlhdCI6MTY2ODQxNjkwMywianRpIjoiZTI1ZTU3ZTMtMmMyYi00YzI0LWE3MWEtNjkyOTQyOTRmMTEzIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMjAwLjQ1OjMxMTM2L2F1dGgvcmVhbG1zL2hybXMtcmVhbG0tdWF0IiwiYXVkIjoiaHJtcy1hY2NvdW50Iiwic3ViIjoiMWNmOWY2MDctNjkzNS00MzU4LWI0NDYtZjgyZDEyYjhkMTJkIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaHJtcy1hY2NvdW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjBmZDYxMjY5LTQ2MTQtNDUwYS05ZGI5LWQwZWI2MzVlYTA1YiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sImF1dGhvcml6YXRpb24iOnsicGVybWlzc2lvbnMiOlt7InJzaWQiOiIwNGNhYmIxOS00YzYxLTQxYjktYjIzMy0wMTRkNWE1MTFhNTEiLCJyc25hbWUiOiJEZWZhdWx0IFJlc291cmNlIn1dfSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwib3JnVHlwZSI6IkwyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSGFpIERhbmcgUGhhbSIsInRlbmFudElkIjoiMmE2YjNjNDYtYTE1ZS00NGNkLWIxOGUtMWFlOWZlZTNmY2NhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGFuZy5waGFtLWhhaSIsImdpdmVuX25hbWUiOiJIYWkgRGFuZyIsInVzZXJJZCI6IjFjZjlmNjA3LTY5MzUtNDM1OC1iNDQ2LWY4MmQxMmI4ZDEyZCIsImZhbWlseV9uYW1lIjoiUGhhbSIsIm9yZ0lkIjoiMDg0OTNkNzQtODQxZS00ZDM4LTk5MjQtODAxZjdlM2E5ZTBiIiwiZW1haWwiOiJkYW5nLnBoYW0taGFpQGJhbnZpZW4uY29tLnZuIn0.lO3WOkQudta3q0Jndj7NXVThg5ViQeixRMxfzPov4u80xpMik0Msn7T0NdKExc0SrRqqTB_HyaJy-4LRv5n6uvnZG2QEDwc_67OtIdJ-Llu5yQBiyTaggRUf-hMuB1nhj-EKAXAtAu0m1oNsDvxnO1Qr12kfTYEa6fJOKZVSV2hoWeUydzK0lwzByMZegFhLyPPubOWGX-GvMn8DET90UlgLHljXoj7r-9Hg56YqS_liFMYgtO8MvX9V8VJiLEkjZH4_XY0JoJbKl0PFrMR1mUj7x7V0uI_vyBI__ftpUFuc4RnPdEglpiDXHSvMlaXjjceXNJj2WVjkLRtxo6OhKA',
    },
    responseType: 'text',
  });
  return res.data;
};
