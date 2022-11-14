import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CdkProps {}

const StyledCdk = styled.div`
  color: pink;
`;

export function Cdk(props: CdkProps) {
  return (
    <StyledCdk>
      <h1>Welcome to Cdk!</h1>
    </StyledCdk>
  );
}

export default Cdk;
