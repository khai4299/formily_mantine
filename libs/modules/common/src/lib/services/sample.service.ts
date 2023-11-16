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

export const getSkill = async (id: string) => {
  const res = await axios.get<BaseReponse<Skill>>(
    process.env['NX_API_GATEWAY_URL'] + `/projects/skills/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data ? res.data.data : null;
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
  return res.data ? res.data.data.items : [];
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
  return res.data ? res.data.data.items : [];
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
  return res.data || null;
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
  return res.data ? res.data.data.items : [];
};
export const getRoles = async () => {
  const res = await axios.get<PagingResponse<Role>>(
    process.env['NX_API_ACCOUNT_URL'] +
      '/authorization/roles?status=active&paging_ignored=true',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data ? res.data.data.items : [];
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
  return res.data || null;
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
  return res.data || null;
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
  return res.data ? res.data.data.items : [];
};
export const getEmployee = async () => {
  const res = await axios.get<BaseReponse<Employee>>(
    process.env['NX_API_ACCOUNT_URL'] +
      '/users/profiles/13e7bc36-d6d1-4ea8-aded-104bdfc3ed75/general-information',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data ? res.data.data : null;
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
export const postEmployee = async (payload: Record<string, unknown>) => {
  const res = await axios.post(
    process.env['NX_API_ACCOUNT_URL'] + `/employees`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    }
  );
  return res.data;
};
export const exportExcel = async (payload: Record<string, unknown>) => {
  const res = await axios.post(
    process.env['NX_API_ACCOUNT_URL'] + `/employees/export-excel`,
    payload,
    {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
