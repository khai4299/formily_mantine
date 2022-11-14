import { render } from '@testing-library/react';

import Cdk from './cdk';

describe('Cdk', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cdk />);
    expect(baseElement).toBeTruthy();
  });
});
