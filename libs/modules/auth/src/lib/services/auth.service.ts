import axios from 'axios';
import { BaseReponse, Preflight } from '@formily-mantine/cdk';

export const login = async (payload: Record<string, string>) => {
  const res = await axios.post(
    process.env['NX_API_GATEWAY_URL'] + '/auth',
    payload
  );
  console.log(res);
};
export const preFlight = async (username: string) => {
  // const res = await axios.post<BaseReponse<Preflight>>(
  //   process.env['NX_API_GATEWAY_URL'] + '/auth/pre-flight',
  //   { data: username + '123123123' }
  // );
  const res = {
    data: '123',
  };
  return res.data;
};
