import styled from 'styled-components';

export const StyledUpload = styled.div`
  width: 100%;

  .mantine-FileInput-input {
    display: flex;
    align-items: center;

    span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
    }
  }
`;
