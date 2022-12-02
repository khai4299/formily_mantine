import axios from 'axios';
import { BaseReponse } from '@formily-mantine/cdk';
import { Skill } from '../types';

const token = localStorage.getItem('access_token');

export const getSkill = async () => {
  const res = await axios.get<BaseReponse<Skill>>(
    process.env['NX_API_GATEWAY_URL'] +
      '/projects/skills/82700c04-0704-463f-befb-c2b0b2286fc9',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const updateSkill = async (payload: Record<string, unknown>) => {
  const res = await axios.put(
    process.env['NX_API_GATEWAY_URL'] +
      `/projects/skills/${payload['skill_id']}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
