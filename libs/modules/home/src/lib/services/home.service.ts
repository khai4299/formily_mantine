import axios from 'axios';
import { BaseUser } from '@formily-mantine/common';

const BASE_URL = 'https://qa-nexthcm-api.banvien.com.vn/accountapp/v1.0';

export const searchUsers = async (params: Record<string, string>) => {
  const res = await axios.get<BaseUser[]>(BASE_URL + '/users/v2', {
    params,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJmT081aTE1RHBpY3hnckxyZ3FsZ29aSTBYcG9yaHRmZ3JxVi1xdFpuc2JNIn0.eyJleHAiOjE2NjY0MDg5MzcsImlhdCI6MTY2NjMyMjUzNywianRpIjoiNDE4YjkzMzMtYWY1My00Nzk4LWI3ZjctNGJlODg5Y2MzOTNiIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMjAwLjQ1OjMxMTMyL2F1dGgvcmVhbG1zL2hybXMtcmVhbG0tcWEiLCJhdWQiOiJocm1zLWFjY291bnQiLCJzdWIiOiI2Yzc5YTI0OC03MzhkLTQ2ZDQtYTkyYi1lODY1MjgwMThiYzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJocm1zLWFjY291bnQiLCJzZXNzaW9uX3N0YXRlIjoiYmQzMWNiNjAtZGE5NS00MzYzLWFiMDktZTg5MTE2M2UyNTRiIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vMTkyLjE2OC4yMDAuNDU6MzExMzIiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJhdXRob3JpemF0aW9uIjp7InBlcm1pc3Npb25zIjpbeyJyc2lkIjoiMTRhY2IzZWEtYTQ4My00OTg4LWIxNTUtNGQzNDkzZjcyNWFkIiwicnNuYW1lIjoiRGVmYXVsdCBSZXNvdXJjZSJ9XX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwidGVuYW50SWQiOiIyYTZiM2M0Ni1hMTVlLTQ0Y2QtYjE4ZS0xYWU5ZmVlM2ZjY2EiLCJuYW1lIjoiVGhhbmggU29uIE5ndXllbiIsInByZWZlcnJlZF91c2VybmFtZSI6InNvbi5uZ3V5ZW4iLCJnaXZlbl9uYW1lIjoiVGhhbmggU29uIiwidXNlcklkIjoiNmM3OWEyNDgtNzM4ZC00NmQ0LWE5MmItZTg2NTI4MDE4YmMzIiwiZmFtaWx5X25hbWUiOiJOZ3V5ZW4iLCJlbWFpbCI6InNvbi5uZ3V5ZW5AYmFudmllbi5jb20udm4iLCJvcmdJZCI6ImI5ZDY4NGM1LTNlZmEtNDc0Zi1hOTgzLTE1MmQwNDc1NDE5NSJ9.NQoaezI8-w7FUaL5XlalVOJMyLuSAJ4w4rtmUGkxD6guWR8pzg-Oi7RdpBude_OBevJ19-_m5r1y2T4rjlX_8NnCZ_PqvX6pm439CDBjKQP-82nzZzRudUolQ5Ngj04tmwXuwM_croh6VLNqNTXUxpSgHjo0ngVv9AyUfe8jepPt0AXvl_qdR4btesrpcSvKq1Gq572i45_6KVnV7Z61zNHt2Q29fxi11zIfXZVp7clObyhx_9LhjpQ_QOdXCrujVw0AEN-kUmdUTHfKgx4APreasb_Bdd1cYFZ-wlqZYteO396QvfPFSNIQ4DbH3i2nztIxxo4m-mqlE3HgvxkyMg',
    },
  });
  return res.data;
};
