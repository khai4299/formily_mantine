import axios from 'axios';
import { BaseReponse, PagingResponse } from '@formily-mantine/cdk';
import {
  Customer,
  Employee,
  Level,
  Office,
  Org,
  Role,
  Site,
  Skill,
  Staff,
  Title,
} from '../types';

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

export const getSites = async () => {
  const res = await axios.get<PagingResponse<Site>>(
    process.env['NX_API_ACCOUNT_URL'] + '/sites',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const getOrgs = async () => {
  const res = await axios.get<PagingResponse<Org>>(
    process.env['NX_API_ACCOUNT_URL'] + '/orgs/v2',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const getTitles = async () => {
  const res = await axios.get<Title[]>(
    process.env['NX_API_ACCOUNT_URL'] + '/titles/v2?status=1',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const getLevels = async () => {
  const res = await axios.get<PagingResponse<Level>>(
    process.env['NX_API_ACCOUNT_URL'] + '/levels/v2?size=999',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const getRoles = async () => {
  const res = await axios.get<PagingResponse<Role>>(
    process.env['NX_API_ACCOUNT_URL'] + '/roles/v2?size=999',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const getStaff = async () => {
  const res = await axios.get<Staff[]>(
    process.env['NX_API_ACCOUNT_URL'] + '/staff-category/v2',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const getCustomer = async () => {
  const res = await axios.get<Customer[]>(
    process.env['NX_API_ACCOUNT_URL'] + '/customer/v2',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const getOffices = async () => {
  const res = await axios.get<PagingResponse<Office>>(
    process.env['NX_API_ACCOUNT_URL'] + '/offices/active?size=999',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const getEmployee = async () => {
  const res = await axios.get<BaseReponse<Employee>>(
    process.env['NX_API_ACCOUNT_URL'] +
      '/employees/be0124d2-c1fe-4495-aca8-8d3b30ce0029',
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
