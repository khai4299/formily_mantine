import React, { MouseEvent, useState } from 'react';
import { StyledLogin } from './styles';
import {
  Checkbox,
  Input,
  Link,
  PasswordInput,
  ValidatorText,
} from '@formily-mantine/components';
import { createSchemaField, FormProvider } from '@formily/react';
import { createForm } from '@formily/core';
import { Button } from '@mantine/core';
import { useMutation } from 'react-query';
import { login, preFlight, saveToken } from '../../services';
import CryptoJS from 'crypto-js';

interface AuthPayload {
  username: string;
  password: string;
  rememberMe: boolean;
}

const form = createForm();
const SchemaField = createSchemaField({
  components: {
    Input,
    PasswordInput,
    Checkbox,
  },
});
const Login = () => {
  const { mutate: onLogin, isLoading: isLoadingLogin } = useMutation(login);
  const { mutate: onPreflight, isLoading: isLoadingPreflight } =
    useMutation(preFlight);
  const [statusError, setStatusError] = useState<number | null>(null);
  const schema = {
    properties: {
      username: {
        required: true,
        'x-component': 'Input',
        'x-component-props': {
          label: 'Username',
          placeholder: `Enter username`,
        },
      },
      password: {
        'x-component': 'PasswordInput',
        required: true,
        'x-component-props': {
          label: 'Password',
          className: 'mt-5',
          placeholder: `Enter password`,
        },
      },
    },
  };
  const schemaSecond = {
    properties: {
      rememberMe: {
        'x-component': 'Checkbox',
        'x-component-props': {
          label: 'Remember my login on this computer',
          className: 'block mt-5',
        },
      },
    },
  };

  const handleOnSubmit = (data: AuthPayload) => {
    onPreflight(data.username, {
      onSuccess: (preflight) => {
        const key = CryptoJS.enc.Base64.parse(preflight.data.secret).toString(
          CryptoJS.enc.Utf8
        );
        const payload = {
          username: data.username,
          password: CryptoJS.AES.encrypt(data.password, key).toString(
            CryptoJS.format.OpenSSL
          ),
        };
        onLogin(payload, {
          onSuccess: ({ data: authInfo }) => {
            saveToken(
              authInfo.access_token,
              authInfo.refresh_token,
              data.rememberMe
            );
            setStatusError(null);
          },
          onError: ({ response }: any) => {
            setStatusError(response.status);
          },
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <StyledLogin>
      <div className="absolute bg-white p-10 rounded-xl h-fit m-auto inset-0 w-[450px]">
        <img
          className="mx-auto mb-10 w-48 block"
          src={'assets/logo.svg'}
          alt=""
        />
        <FormProvider form={form}>
          <SchemaField schema={schema} />
          {statusError && (
            <ValidatorText
              message={
                statusError === 401
                  ? 'The username or password is incorrect.'
                  : 'The server is not responding.'
              }
            />
          )}
          <SchemaField schema={schemaSecond} />
          {/*<Field*/}
          {/*  name="rememberMe"*/}
          {/*  component={[*/}
          {/*    Checkbox,*/}
          {/*    {*/}
          {/*      label: 'Remember my login on this computer',*/}
          {/*      className: 'block mt-5',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*/>*/}
        </FormProvider>
        <p>
          Can't access your account? Please contact your{' '}
          <Link href="https://www.facebook.com/saj.qtk/" target="_blank">
            Mr.Khai
          </Link>
        </p>
        <Button
          size="lg"
          loading={isLoadingLogin || isLoadingPreflight}
          className="block mx-auto mt-6 w-full"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            e.preventDefault();
            form.submit(handleOnSubmit).catch(() => false);
          }}
        >
          Login
        </Button>
      </div>
    </StyledLogin>
  );
};

export default Login;
