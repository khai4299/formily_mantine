import { render } from '@testing-library/react';

import ModulesHome from './modules-home';

describe('ModulesHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModulesHome />);
    expect(baseElement).toBeTruthy();
  });
});
