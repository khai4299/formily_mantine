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
        'Bearer  eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJqeTlxNWxUMjU1VVktc3o1M3JIRFFIOUF5dlB2cGV6Z25XQXJfNGNCVHhVIn0.eyJleHAiOjE2Njg2NTU0NjEsImlhdCI6MTY2ODU2OTA2MSwianRpIjoiZmExNmVlZGEtYTU2NC00M2Q3LTlhZjAtYjgwY2QxYWY5NDMyIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMjAwLjQ1OjMyMTIwL3JlYWxtcy9oY20tcHJvZCIsImF1ZCI6ImhjbS1hY2NvdW50Iiwic3ViIjoiOWJlMGM0NjMtMWYxNy00Njc4LTgxYjQtZmNiZjNhNWY0MzljIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaGNtLWFjY291bnQiLCJzZXNzaW9uX3N0YXRlIjoiZjNjNzdhNTgtNmQ4MC00ZWU1LTg1OGUtNDgxM2YxZDE3MWIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly8xOTIuMTY4LjIwMC40NTozMjEyMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sImF1dGhvcml6YXRpb24iOnsicGVybWlzc2lvbnMiOlt7InJzaWQiOiIwNGNhYmIxOS00YzYxLTQxYjktYjIzMy0wMTRkNWE1MTFhNTEiLCJyc25hbWUiOiJEZWZhdWx0IFJlc291cmNlIn1dfSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiZjNjNzdhNTgtNmQ4MC00ZWU1LTg1OGUtNDgxM2YxZDE3MWIwIiwib3JnVHlwZSI6IkwzIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiVGhhbmggU29uIE5ndXllbiIsInRlbmFudElkIjoiMmE2YjNjNDYtYTE1ZS00NGNkLWIxOGUtMWFlOWZlZTNmY2NhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29uLm5ndXllbiIsImdpdmVuX25hbWUiOiJUaGFuaCBTb24iLCJ1c2VySWQiOiI5YmUwYzQ2My0xZjE3LTQ2NzgtODFiNC1mY2JmM2E1ZjQzOWMiLCJmYW1pbHlfbmFtZSI6Ik5ndXllbiIsIm9yZ0lkIjoiMDg0OTNkNzQtODQxZS00ZDM4LTk5MjQtODAxZjdlM2E5ZTBiIiwiZW1haWwiOiJzb24ubmd1eWVuQGJhbnZpZW4uY29tLnZuIn0.QkStdRoclfkJ0mnuKDaoOWjeCnY1R0AxE02V04cjJaD_W35LD8XNTVYb45JG3-w2-CdEVI2hNAG7wDEuErlLordKbek05LyFzvvd4oR27rj6PuVn7Dmxik3l13QJiMdmjh_ZJw0zzFAGXrUqt8iBixQ8W1PHwedK8wLlxCWC3CVwCZl4TyvijAmHWZA9UMFFQZPp6N-pFk2Z-mQq2zQPIJSPBodOrgZ_vADyLDqqQ9McNv6ytC5LHuDSWUZ9KZaVTnNj9WytGayv6ORbuTN2nd24EvsErnK_459YuOB5RdKhpqOaKeFfwDs0wwISVMsdzK18KQCUpyVtkEquuTlrKw',
    },
    responseType: 'text',
  });
  return res.data;
};
