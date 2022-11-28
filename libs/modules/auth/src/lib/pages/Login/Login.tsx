import React, { MouseEvent, useState } from 'react';
import { StyledLogin } from './styles';
import {
  Input,
  PasswordInput,
  Checkbox,
  Link,
} from '@formily-mantine/components';
import { createSchemaField, FormProvider } from '@formily/react';
import { createForm } from '@formily/core';
import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { login, preFlight } from '../../services';
import CryptoJS from 'crypto-js';

const Login = () => {
  const form = createForm();
  // const { mutate: onLogin, isLoading } = useMutation(login, {
  //   onSuccess: (response) => {
  //     console.log('123');
  //   },
  //   onError: () => {
  //     form.fields['password'].setState((state) => state.invalid);
  //   },
  // });
  // const onPreflight = useMutation(preFlight, {
  //   onSuccess: (response) => {
  //     console.log(response);
  //   },
  //
  // });
  const mutation = useMutation({
    mutationFn: preFlight,
  });

  const SchemaField = createSchemaField({
    components: {
      Input,
      PasswordInput,
      Checkbox,
    },
  });
  const schema = {
    type: 'object',
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
        required: true,
        'x-component': 'PasswordInput',
        'x-component-props': {
          label: 'Password',
          className: 'mt-5',
          placeholder: `Enter password`,
        },
      },
      rememberMe: {
        'x-component': 'Checkbox',
        'x-component-props': {
          label: 'Remember my login on this computer',
          className: 'block mt-5',
        },
      },
    },
  };
  const handleOnSubmit = (data: Record<string, string>) => {
    mutation.mutate(data['username']);
    console.log(data);
  };
  return (
    <StyledLogin>
      <FormProvider form={form}>
        <form
          onSubmit={(e) => {
            // e.stopPropagation();
            e.preventDefault();
            form.submit(handleOnSubmit).catch(() => false);
          }}
        >
          <div className="absolute bg-white p-10 rounded-xl h-fit m-auto inset-0 w-[450px]">
            <img
              className="mx-auto mb-10 w-48 block"
              src={'assets/logo.svg'}
              alt=""
            />
            <SchemaField schema={schema} />
            <p>
              Can't access your account? Please contact your{' '}
              <Link href="https://www.facebook.com/saj.qtk/" target="_blank">
                Mr.Khai
              </Link>
            </p>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </FormProvider>
    </StyledLogin>
  );
};

export default Login;
