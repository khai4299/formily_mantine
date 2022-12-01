import { render } from '@testing-library/react';

import ModulesCommon from './modules-common';

describe('ModulesCommon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesCommon />);
    expect(baseElement).toBeTruthy();
  });
});
