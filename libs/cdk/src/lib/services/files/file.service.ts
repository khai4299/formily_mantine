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
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJmT081aTE1RHBpY3hnckxyZ3FsZ29aSTBYcG9yaHRmZ3JxVi1xdFpuc2JNIn0.eyJleHAiOjE2Njg3NTYwODIsImlhdCI6MTY2ODY2OTY4MiwianRpIjoiYjM3YWI1OGItYmYwZC00YTBjLTkzZGUtN2U0Yjc0ODZkOGQ5IiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMjAwLjQ1OjMyMTEwL3JlYWxtcy9ocm1zLXJlYWxtLXFhIiwiYXVkIjoiaHJtcy1hY2NvdW50Iiwic3ViIjoiNmM3OWEyNDgtNzM4ZC00NmQ0LWE5MmItZTg2NTI4MDE4YmMzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaHJtcy1hY2NvdW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImZjOTQyZGJmLTJkOGYtNDFmMi05NGZmLTM0MTM3Yzg3M2RmNyIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vMTkyLjE2OC4yMDAuNDU6MzIxMTAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJhdXRob3JpemF0aW9uIjp7InBlcm1pc3Npb25zIjpbeyJyc2lkIjoiMTRhY2IzZWEtYTQ4My00OTg4LWIxNTUtNGQzNDkzZjcyNWFkIiwicnNuYW1lIjoiRGVmYXVsdCBSZXNvdXJjZSJ9XX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6ImZjOTQyZGJmLTJkOGYtNDFmMi05NGZmLTM0MTM3Yzg3M2RmNyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ0ZW5hbnRJZCI6IjJhNmIzYzQ2LWExNWUtNDRjZC1iMThlLTFhZTlmZWUzZmNjYSIsIm5hbWUiOiJUaGFuaCBTb24gTmd1eWVuIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29uLm5ndXllbiIsImdpdmVuX25hbWUiOiJUaGFuaCBTb24iLCJ1c2VySWQiOiI2Yzc5YTI0OC03MzhkLTQ2ZDQtYTkyYi1lODY1MjgwMThiYzMiLCJmYW1pbHlfbmFtZSI6Ik5ndXllbiIsImVtYWlsIjoic29uLm5ndXllbkBiYW52aWVuLmNvbS52biIsIm9yZ0lkIjoiMzRhNmE1MmMtOTJmNy00YTY4LWJmNGUtZDhiZjk1NTRkOWJhIn0.HrwyJwzJqnvl0-1G4ZIVRCvVhMRn1XzXXXaRwdm8cBhazE9-fxNknvxqijE3ZI6_bnPaNfvnXYgmI79sMF1paTrf-zGL4bpV-cz_gxeDgEJ0dAqjysG5bSUPH8auYGw7K05r-63Lft524rZGOOVPzCP5K5K8xXHRYBlkcAeYR7qb4r1YWNXAIfNVERhJPAcam_PC_fvlRtIRCz7Of4E-f_U56SW1StkDgqNVQ9I-TMTyNalrqLfEy0z1L6BA1zrRSUoL1yJY6f2oovRg1gykX_tAfdaWuB0OKSF5s6C4nfJIPupLdAVMkiPGk3LHRwS8L9SWoViMLKli-YrJJQ1--Q',
    },
    responseType: 'text',
  });
  return res.data;
};
