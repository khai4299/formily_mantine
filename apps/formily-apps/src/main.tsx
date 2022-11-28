import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';

import App from './app/app';
import './styles.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        fontFamily: 'Inter, sans-serif',
        globalStyles: () => ({
          body: {
            fontSize: '13px',
          },
        }),
      }}
    >
      <App />
    </MantineProvider>
  </StrictMode>
);
