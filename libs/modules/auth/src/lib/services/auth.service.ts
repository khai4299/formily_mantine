import axios from 'axios';
import { BaseReponse } from '@formily-mantine/cdk';
import { AuthInfo, Preflight } from '../types';

export const login = async (payload: Record<string, string>) => {
  return await axios.post<AuthInfo>(
    process.env['NX_API_GATEWAY_URL'] + '/auth',
    payload
  );
};
export const preFlight = async (username: string) => {
  const res = await axios.post<BaseReponse<Preflight>>(
    process.env['NX_API_GATEWAY_URL'] + '/auth/pre-flight',
    { data: username }
  );
  return res.data;
};
export const saveToken = (
  access_token: string,
  refresh_token: string,
  rememberMe = true
): void => {
  localStorage.setItem('access_token', access_token);
  rememberMe && localStorage.setItem('refresh_token', refresh_token);
};
